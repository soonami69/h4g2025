const User = require("../models/UserModel");

// create user
module.exports.createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Fill in required fields",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await User.create({ name, email });

        res.status(200).json({
            success: true,
            message: "User is created",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User is not created",
            error: err.message,
        });
    }
}

// get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users are fetched",
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Users are not fetched",
            error: err.message,
        });
    }
}

// get user by id
module.exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found by ID",
            });
        }

        res.status(200).json({
            success: true,
            message: "User is fetched by ID",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User is not fetched by ID",
            error: err.message,
        });
    }
}

// get user by email
module.exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found by email",
            });
        }

        res.status(200).json({
            success: true,
            message: "User is fetched by email",
            data: user,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "User is not fetched by email",
            error: err.message,
        });
    }
}