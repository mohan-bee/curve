const express = require('express')
const connectDB = require('./utils/connectDB')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth.middleware')
const run = require('./core/python')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://curve-nine.vercel.app",
    credentials: true
}))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/problem',authMiddleware, require('./routes/problem'))
app.use('/api/topic',authMiddleware, require('./routes/topic'))
app.use('/api/code',authMiddleware, require('./routes/coderunner'))


const testCode = `print(\"Hello\")`;

(async () => {
    try {
        const res = await run(testCode)
    console.log(res)
    } catch (error) {
        console.log(error)
    }
})()

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is Running at ${process.env.PORT}`)
})
