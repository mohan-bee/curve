const { login,logout, verifyOTP,getProfile,listUser,blockUser,verifyUser } = require("../controllers/auth")
const authMiddleware = require("../middlewares/auth.middleware")
const isAdmin = require("../middlewares/isAdmin")

const router = require("express").Router()

router.post('/login', login)
router.get('/logout', authMiddleware,  logout)
router.post('/verify', verifyOTP)
router.get('/profile',authMiddleware, getProfile)
router.get('/admin/users', authMiddleware, isAdmin, listUser)
router.get('/admin/block/:userId', authMiddleware,isAdmin, blockUser)
router.get('/admin/verify/:userId', authMiddleware,isAdmin, verifyUser)

module.exports = router