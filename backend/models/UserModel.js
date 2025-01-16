const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
        required: true,
        unique: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }],
    meetings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting",
    }]
});

module.exports = mongoose.model("User", userSchema);