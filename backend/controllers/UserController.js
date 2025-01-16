const User = require("../models/UserModel");

// create user
module.exports.createUser = async (req, res) => {
    const { name, email, department, role} = req.body;

    try {
        if (!name || !email || !department || !role) {
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

        const user = await User.create({ name, email, department, role });

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

// get name by email
module.exports.getNameByEmail = async (req, res) => {
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
            message: "Name is fetched by email",
            data: user.name,
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Name is not fetched by email",
            error: err.message,
        });
    }
}

// update User
module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, department, role, tasks, meetings} = req.body;

        // check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User is not found",
            });
        }

        // check if new email already exists
        if (email) {
            const existingEmail = await User.findOne({email});
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }
        
        // update user
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true});


        return res.status(200).json({
            success: true,
            message: "User is updated",
            data: updatedUser,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User is not updated",
            error: err.message,
        })
    }
}