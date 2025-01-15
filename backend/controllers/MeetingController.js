const Meeting = require("../models/MeetingModel");
const User = require("../models/UserModel");

async function createMeetingHelper(req, res) {
    // users passed in as user ids
    var { title, scheduleDate, startTime, endTime, location, users } = req.body;

    try {
        if (!title || !scheduleDate || !startTime || !endTime || !location || !users) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            });
        }

        const existingMeeting = await Meeting.findOne({title, scheduleDate, startTime, endTime, location, users});
        if (existingMeeting) {
            return res.status(400).json({
                success: false,
                message: "Meeting already exists",
            })
        }

        const meeting = await Meeting.create({
            title: title,
            scheduleDate: scheduleDate,
            startTime: startTime,
            endTime: endTime,
            location: location,
            users: users
        });

        for (let i = 0; i < users.length; i++) {
            const userId = users[i];
            // update user meeting list
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { meetings: meeting._id }
            }, {new: true});
        }

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
}

// create meeting
module.exports.createMeeting = async (req, res) => {
    // add logic for adding into user schema (helper function outside)
    await createMeetingHelper(req, res);
};

async function deleteMeetingHelper(req, res) {
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

        for (let i = 0; i < users.length; i++) {
            const userId = users[i];
            // update user meeting list
            const updatedUser = await User.findByIdAndUpdate(userId, {
                $pull: { meetings: deletedMeeting._id }
            }, {new: true});
        }

        return res.status(200).json({
            success: true,
            message: "Meeting is deleted",
            data: deletedMeeting,
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            success: false,
            message: "Meeting is not deleted",
            error: err.message,
        })
    }
}

// delete Meeting
module.exports.deleteMeeting = async (req, res) => {
    await deleteMeetingHelper(req, res);
};

// update meeting
module.exports.updateMeeting = async (req, res) => {
    try {
        // delete old meeting (helper function)
        await deleteMeetingHelper(req, res);

        // create new meeting (helper function)
        await createMeetingHelper(req, res);

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