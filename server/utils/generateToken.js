const jwt = require("jsonwebtoken")

const generateToken = async (res,user) =>{
       try {
         const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("token", token, {
             maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:  process.env.ENV != "developement",
            sameSite: 'none',
            secure: process.env.ENV != "developement",
        })

        return token
       } catch (error) {
        console.log("Error generating Token: ", error.message)
       }
}

module.exports = generateToken