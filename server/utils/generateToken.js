const jwt = require("jsonwebtoken")

const generateToken = async (res,user) =>{
       try {
         const token = jwt.sign({id: user._id, username: user.username, email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("token", token, {
              maxAge: 7 * 24 * 60 * 60 * 1000, 
              httpOnly: true,                  
              sameSite: process.env.ENV === "development" ? "lax" : "none", 
              // secure: process.env.ENV !== "development",
              secure: false
       });

       console.log(res.cookies, token)
        return token
       } catch (error) {
        console.log("Error generating Token: ", error.message)
       }
}

module.exports = generateToken