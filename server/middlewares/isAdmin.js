const User = require('../models/User')


const isAdmin = async (req,res,next) => {
    try {
        const id = req.user.id
        const user = await User.findById(id)
        if(!user.isAdmin){
            return res.status(401).json({msg: "Unauthorised Access"})
        }
        next()
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = isAdmin