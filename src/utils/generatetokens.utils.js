const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not set in environment variables!");
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Error generating token");
    }
};

module.exports = generateToken;
