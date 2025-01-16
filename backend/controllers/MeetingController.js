const Meeting = require("../models/MeetingModel");
const User = require("../models/UserModel");

// create meeting
module.exports.createMeeting = async (req, res) => {
    // users passed in as user ids
    var { title, startTime, endTime, location, description, users } = req.body;

    try {
        if (!title || !startTime || !endTime || !location || !description || !users) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            });
        }

        const existingMeeting = await Meeting.findOne({title, startTime, endTime, location, description, users});
        if (existingMeeting) {
            return res.status(400).json({
                success: false,
                message: "Meeting already exists",
            })
        }

        const meeting = await Meeting.create({
            title: title,
            startTime: startTime,
            endTime: endTime,
            location: location,
            description: description,
            users: users
        });

        await Promise.all(users.map(userId => 
            User.findByIdAndUpdate(userId, {
                $push: { meetings: meeting._id }
            }, { new: true })
        ));

        return res.status(200).json({
            success: true,
            message: "Meeting is created",
            data: meeting,
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            success: false,
            message: "Meeting is not created",
            error: err.message,
        })
    }
};

// delete meeting
module.exports.deleteMeeting = async (req, res) => {
    // users passed in as user ids
    var { id } = req.params;

    try {
        const deletedMeeting = await Meeting.findByIdAndDelete(id);

        if (!deletedMeeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found",
            });
        }

        const users = deletedMeeting.users;

        await Promise.all(users.map(userId => 
            User.findByIdAndUpdate(userId, {
                $pull: { meetings: deletedMeeting._id }
            }, { new: true })
        ));

        return res.status(200).json({
            success: true,
            message: "Meeting is deleted",
            data: deletedMeeting,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Meeting is not deleted",
            error: err.message,
        })
    }
};

// update meeting
module.exports.updateMeeting = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, startTime, endTime, location, description, users } = req.body;

        // check if meeting exists
        const existingMeeting = await Meeting.findById(id);
        if (!existingMeeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting is not found",
            });
        }

        // check if new title already exists
        if (title) {
            const existingTitle = await Meeting.findOne({title});
            if (existingTitle) {
                return res.status(400).json({
                    success: false,
                    message: "Title already exists",
                });
            }
        }
        
        // update meeting
        const updatedMeeting = await Meeting.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true});

        // check for change in users
        if (users) {
            const oldUsers = existingMeeting.users;
            const newUsers = users;

            // remove old meeting from old users
            await Promise.all(oldUsers.map(userId => 
                User.findByIdAndUpdate(userId, {
                    $pull: { meetings: existingMeeting._id }
                }, { new: true })
            ));

            // add new meeting to new users
            await Promise.all(newUsers.map(userId => 
                User.findByIdAndUpdate(userId, {
                    $push: { meetings: updatedMeeting._id }
                }, { new: true })
            ));
        }

        return res.status(200).json({
            success: true,
            message: "Meeting is updated",
            data: updatedMeeting,
        });

        // notify users of updated meeting
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Meeting is not updated",
            error: err.message,
        })
    }
}

// get meeting by id
module.exports.getMeetingById = async (req, res) => {
    const { id } = req.params;

    try {
        const meeting = await Meeting.findById(id);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting is not found by ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Meeting is fetched by ID",
            data: meeting,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Meeting is not fetched by ID",
            error: err.message,
        });
    }
}

// get all meetings
module.exports.getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find();

        return res.status(200).json({
            success: true,
            message: "All meetings are fetched",
            data: meetings,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "All meetings are not fetched",
            error: err.message,
        });
    }
}


// get list of users in meeting
module.exports.getAllMeetingUsers = async (req, res) => {
    const { id } = req.params;

    try {
        const meeting = await Meeting.findById(id);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting is not found by ID",
            });
        }

        usersList = meeting.users;

        // Resolve all user promises concurrently
        const userDocuments = await Promise.all(usersList.map(userId => User.findById(userId)));

        // Extract names from the user documents
        const names = userDocuments.map(user => user ? user.name : null);

        return res.status(200).json({
            success: true,
            message: "Users in meeting is fetched by ID",
            data: names,
            // data: meeting.users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Users in meeting is not fetched by ID",
            error: err.message,
        });
    }
}

// get all meetings of a specific user
module.exports.getAllUserMeetings = async (req, res) => {
    const { id } = req.params;

    try {
        const meetings = await Meeting.find({ users: id });

        return res.status(200).json({
            success: true,
            message: "All meetings of user are fetched",
            data: meetings,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "All meetings of user are not fetched",
            error: err.message,
        });
    }
}
