const Task = require("../models/TaskModel");
const User = require("../models/UserModel");

async function createTaskHelper(req, res) {
    // users passed in as user ids
    var { title, deadlineDate, deadlineTime, description, users } = req.body;

    try {
        if (!title || !deadlineDate || !deadlineTime || !users) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            });
        }

        const existingTask = await Task.findOne({title, deadlineDate, deadlineTime, description, users});
        if (existingTask) {
            return res.status(400).json({
                success: false,
                message: "Task already exists",
            })
        }

        const task = await Task.create({
            title: title,
            description: description,
            deadlineDate: deadlineDate,
            deadlineTime: deadlineTime,
            users: users
        });

        for (let i = 0; i < users.length; i++) {
            const userId = users[i];
            // update user task list
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { tasks: task._id }
            }, {new: true});
        }

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
}

// create task
module.exports.createTask = async (req, res) => {
    // add logic for adding into user schema (helper function outside)
    await createTaskHelper(req, res);
};

async function deleteTaskHelper(req, res) {
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

        for (let i = 0; i < users.length; i++) {
            const userId = users[i];
            // update user task list
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $pull: { tasks: deletedTask._id }
            }, {new: true});
        }

        return res.status(200).json({
            success: true,
            message: "Task is deleted",
            data: deletedTask,
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            success: false,
            message: "Task is not deleted",
            error: err.message,
        })
    }
}

// delete Task
module.exports.deleteTask = async (req, res) => {
    await deleteTaskHelper(req, res);
};

// update task
module.exports.updateTask = async (req, res) => {
    try {
        // delete old task (helper function)
        await deleteTaskHelper(req, res);

        // create new task (helper function)
        await createTaskHelper(req, res);

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