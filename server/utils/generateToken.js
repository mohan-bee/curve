const jwt = require("jsonwebtoken")

const generateToken = async (res, user) => {
    try {
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        // Properly configure cookie for cross-origin requests
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 1000, // 7 days
            httpOnly: true,                   // Prevent XSS attacks
            secure: process.env.ENV !== "development", // Use secure in production
            sameSite: process.env.ENV === "development" ? "lax" : "none", // Allow cross-origin in production
        });

        return token
    } catch (error) {
        console.log("Error generating Token: ", error.message)
    }
}

module.exports = generateToken