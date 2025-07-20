const mongoose = require('mongoose')

module.exports = async  () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected Successfully")
    } catch (error) {
        console.error(error)
    }
}