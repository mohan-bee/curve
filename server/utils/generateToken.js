const jwt = require("jsonwebtoken")

const generateToken = async (res, user) => {
    try {
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        // --- Debugging Logs ---
        console.log(`[Token Generation] JWT Secret Used: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
        console.log(`[Token Generation] Environment (process.env.ENV): ${process.env.ENV}`);
        console.log(`[Token Generation] Generated Token: ${token.substring(0, 10)}...`); // Log a snippet
        // ----------------------
       
       res.cookie("token", token, {
              maxAge: 7 * 24 * 60 * 60 * 1000, 
              httpOnly: true,                  
              secure: false,  // KEEP THIS AS FALSE (because you're on HTTP)
              sameSite: "lax", // 💡 CHANGE THIS TO 'lax'
              });
        
        return token
    } catch (error) {
        console.log("Error generating Token: ", error.message)
    }
}

module.exports = generateToken