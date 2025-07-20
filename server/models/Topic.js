const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImg: {
        type: String
    }
    
})

module.exports = mongoose.model("Topic", topicSchema)