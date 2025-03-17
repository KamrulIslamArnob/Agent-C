const User = require('../models/authentication.models');
const generateToken = require('../utils/generatetokens.utils');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, dob } = req.body;
    let user; // Declare user outside the try block

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save user
        user = new User({ name, email, password, dob });
        await user.save();

        // Debug: Log user creation success
        console.log("User created successfully:", user);

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Generate JWT
        const token = generateToken(user._id);

        // Debug: Log token generation success
        console.log("Token generated successfully:", token);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            dob: user.dob,
            token
        });

    } catch (error) {
        console.error("Error in registerUser:", error);

        // Debugging: Check if user exists before accessing its properties
        const responseData = {
            message: "Internal Server Error",
            error: error.message
        };

        if (user) {
            responseData.user = {
                _id: user._id,
                email: user.email
            };
        }

        res.status(500).json(responseData);
    }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = generateToken(user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { registerUser, loginUser };
