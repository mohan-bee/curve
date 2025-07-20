const jwt = require("jsonwebtoken")

const generateToken = async (res,user) =>{
       try {
         const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("token", token, {
            httpOnly: false,   // prevents JS access
            secure: true, // HTTPS only in prod
            sameSite: "strict", // or "lax"
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        })

        return token
       } catch (error) {
        console.log("Error generating Token: ", error.message)
       }
}

module.exports = generateToken