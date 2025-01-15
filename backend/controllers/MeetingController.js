const Meeting = require("../models/MeetingModel");

async function createMeetingHelper(fields) {
    const { title, scheduleDate, scheduleTime, location, users } = fields;

    try {
        if (!title, scheduleDate, scheduleTime, users) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            })
        }


        const existingMeeting = await Meeting.findOne({title, scheduleDate, scheduleTime, location, users});
        if (existingMeeting) {
            return res.status(400).json({
                success: false,
                message: "Meeting already exists",
            })
        }

        const meeting = await Meeting.create({
            title: title,
            scheduleDate: scheduleDate,
            scheduleTime: scheduleTime,
            location: location,
            users: users
        });

        for (let i = 0; i < users.length; i++) {
            const userId = users[i];
            // update user meeting list
        }

        return {
            status: true,
            data: meeting
        }
    } catch (err) {
        return {
            status: false, 
            data: err}
    }
}

// create meeting
module.exports.createMeeting = async (req, res) => {
    // add logic for adding into user schema (helper function outside)
    const {status, data} = await createMeetingHelper(req.body);

    // notify users of new meeting
    if (status) {
        res.status(200).json({
            success: true,
            message: "Meeting is created",
            data: data,
        })
    } else {
        res.status(500).json({
            success: false,
            message: "Meeting is not created",
        })
    }
};


// delete Meeting
module.exports.deleteMeeting = async (req, res) => {
    const { id } = req.params;

    console.log("harro")

    try {
        const deletedMeeting = await Meeting.findByIdAndDelete(id);

        // update relevant user schema (helper function outside)
        
        // notify users of deleted meeting

        res.status(200).json({
            success: true,
            message: "Meeting is deleted",
            data: deletedMeeting,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Meeting is not deleted",
            error: err.message,
        })
    }
};

// update meeting
module.exports.updateMeeting = async (req, res) => {
    const {id} = req.params

    try {
        // delete old meeting (helper function)

        // create new meeting (helper function)

        // notify users of updated meeting

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Meeting is not updated",
            error: err.message,
        })
    }
}