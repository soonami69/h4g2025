const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    scheduleDate: {
        type: String,
        default: "",
        required: true,
    },
    startTime: {
        type: String,
        default: "",
        required: true,
    },
    endTime: {
        type: String,
        default: "",
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