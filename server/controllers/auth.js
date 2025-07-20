const OTP = require("../models/OTP")
const User = require("../models/User")
const generateToken = require('../utils/generateToken')
const sendOTP = require("../utils/nodemailer")

const generateOTP = () => {
    return Math.floor(Math.random() * 9999)
}

const login = async (req,res) => {
    try {
        const {username, email} = req.body
        const isUser = await User.findOne({email})
        if(!isUser){
            const newUser = new User({username, email })
            await newUser.save()
        }
        const otp = generateOTP()
        sendOTP(email, otp)
        const newOtp = new OTP({user: isUser._id || newUser._id , otp})
        await newOtp.save()

        return res.status(200).json({msg: "OTP Send Successfully", user: isUser || newUser, otp})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const verifyOTP = async (req,res) => {
    try {
        const {otp} = req.body
        const existingOTP = await OTP.findOne({otp})
        if(!existingOTP){
            return res.status(400).json({msg: "OTP Verification Failed !!"})
        }
        const user = await User.findByIdAndUpdate(existingOTP.user, {verified: true}, {new: true})
        await OTP.findByIdAndUpdate(existingOTP._id, {otp: 0})
        console.log(user)
        generateToken(res,user)
        return res.status(200).json({msg: "OTP Verified Successfully !!"})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const getProfile = async (req,res) => {
    try {
        const id = req.user.id
        // console.log(req.user)
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({msg: "User Not Found"})
        }
        return res.status(200).json({msg: "User Got Successfully !", user})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const listUser = async (req,res) => {
    try {
        const id  = req.user.id
        const user = await User.findById(id)
        if(!user?.isAdmin){
            return res.status(401).json({msg: "Unauthorised Access"})
        }
        const allUsers = await User.find({isAdmin: false})
        return res.status(200).json({msg: "All Users", allUsers})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const blockUser = async (req,res) => {
    try {
        const id  = req.user.id
        const {userId} = req.params
        const user = await User.findById(id)
        if(!user?.isAdmin){
            return res.status(401).json({msg: "Unauthorised Access"})
        }
        await User.findByIdAndUpdate(userId, {verified: false})
        const users = await User.find({isAdmin: false})
        return res.status(200).json({msg: "User Blocked Successfully !!", users})
    } catch (error) {
         return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({msg: "User Logged out Successfully"})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }

}
const verifyUser = async (req,res) => {
    try {
        const id  = req.user.id
        const {userId} = req.params
        const user = await User.findById(id)
        if(!user?.isAdmin){
            return res.status(401).json({msg: "Unauthorised Access"})
        }
        await User.findByIdAndUpdate(userId, {verified: true})
        const users = await User.find({isAdmin: false})
        return res.status(200).json({msg: "User Verified Successfully !!", users})
    } catch (error) {
         return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
module.exports = {login,logout, verifyOTP, getProfile, listUser, blockUser, verifyUser}
