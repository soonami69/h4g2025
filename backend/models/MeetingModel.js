const mongoose = require("mongoose");

const emptyObjectId = new mongoose.Types.ObjectId('000000000000000000000000');

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
    scheduleTime: {
        type: String,
        default: "",
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        default: [],
        required: true
    }
    }, {
        timestamps: true,
    }
);

module.exports = mongoose.model("Meeting", meetingSchema);