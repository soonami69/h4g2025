const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    startTime: {
        type: Date, // stores both date and time
        required: true,
    },
    endTime: {
        type: Date, // stores both date and time
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
});

module.exports = mongoose.model("Meeting", meetingSchema);