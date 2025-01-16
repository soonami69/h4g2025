const Task = require("../models/TaskModel");
const User = require("../models/UserModel");

// create task
module.exports.createTask = async (req, res) => {
    // users passed in as user ids
    var { title, description, status, deadline, users } = req.body;

    try {
        if (!title || !deadline || !users) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            });
        }

        const existingTask = await Task.findOne({title, description, status, deadline, users});
        if (existingTask) {
            return res.status(400).json({
                success: false,
                message: "Task already exists",
            })
        }

        const task = await Task.create({
            title: title,
            description: description, 
            status: status, 
            deadline: deadline,
            users: users
        });

        await Promise.all(users.map(userId => 
            User.findByIdAndUpdate(userId, {
                $push: { tasks: task._id }
            }, { new: true })
        ));

        return res.status(200).json({
            success: true,
            message: "Task is created",
            data: task,
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            success: false,
            message: "Task is not created",
            error: err.message,
        })
    }
};

// delete task
module.exports.deleteTask = async (req, res) => {
    // users passed in as user ids
    var { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const users = deletedTask.users;

        await Promise.all(users.map(userId => 
            User.findByIdAndUpdate(userId, {
                $pull: { tasks: deletedTask._id }
            }, { new: true })
        ));

        return res.status(200).json({
            success: true,
            message: "Task is deleted",
            data: deletedTask,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Task is not deleted",
            error: err.message,
        })
    }
};

// update task
module.exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, deadline, users } = req.body;

        // check if task exists
        const existingTask = await Task.findById(id);
        if (!existingTask) {
            return res.status(404).json({
                success: false,
                message: "Task is not found",
            });
        }

        // check if new title already exists
        if (title) {
            const existingTitle = await Task.findOne({title});
            if (existingTitle) {
                return res.status(400).json({
                    success: false,
                    message: "Title already exists",
                });
            }
        }
        
        // update task
        const updatedTask = await Task.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true});

        // check for change in users
        if (users) {
            const oldUsers = existingTask.users;
            const newUsers = users;

            // remove old task from old users
            await Promise.all(oldUsers.map(userId => 
                User.findByIdAndUpdate(userId, {
                    $pull: { tasks: existingTask._id }
                }, { new: true })
            ));

            // add new task to new users
            await Promise.all(newUsers.map(userId => 
                User.findByIdAndUpdate(userId, {
                    $push: { tasks: updatedTask._id }
                }, { new: true })
            ));
        }

        return res.status(200).json({
            success: true,
            message: "Task is updated",
            data: updatedTask,
        });

        // notify users of updated task
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Task is not updated",
            error: err.message,
        })
    }
}

// get task by id
module.exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task is not found by ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task is fetched by ID",
            data: task,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Task is not fetched by ID",
            error: err.message,
        });
    }
}

// get all tasks
module.exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            success: true,
            message: "Tasks are fetched",
            data: tasks,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Tasks are not fetched",
            error: err.message,
        });
    }
}

// get all tasks of a specific user
module.exports.getAllUserTasks = async (req, res) => {
    const { id } = req.params;

    try {
        var tasks = await Task.find({ users: id });

        const getUserNames = async (userIds) => {
            const users = await User.find({ _id: { $in: userIds } });
            return users.map(user => user.name);
        };
        
        const tasksWithUserNames = await Promise.all(tasks.map(async (task) => {
            const userNames = await getUserNames(task.users);
            return {
                ...task._doc, // Spread the original meeting document
                users: userNames // Replace users with user names
            };
        }));

        return res.status(200).json({
            success: true,
            message: "All tasks of user are fetched",
            data: tasksWithUserNames,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "All tasks of user are not fetched",
            error: err.message,
        });
    }
}