const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    visitedProblems: [{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }]
})


module.exports = mongoose.model("User", userSchema)