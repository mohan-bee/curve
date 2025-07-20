const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    otp: {
        type: Number,
    }
})

module.exports = mongoose.model("OTP", otpSchema)