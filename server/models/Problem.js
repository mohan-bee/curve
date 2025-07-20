const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    },
    visited: {
        type: Boolean,
        default: false
    },
    solved: {
        type: Boolean,
        default: false
    },
    testCases: [{
        input: String,
        output: String,
        expected: String,
        passed: Boolean,
    }]
})

module.exports = mongoose.model("Problem", problemSchema)