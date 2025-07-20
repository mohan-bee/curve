const { getAllTopics,getOneTopic, createTopic, editTopic, deleteTopic, exitCurve } = require('../controllers/topic')
const isAdmin = require('../middlewares/isAdmin')

const router = require('express').Router()

router.get('/all', getAllTopics)
router.get('/:id', getOneTopic)
router.post('/create',isAdmin, createTopic)
router.put('/edit/:id',isAdmin, editTopic)
router.delete('/delete/:id',isAdmin, deleteTopic)
router.put('/exit', exitCurve)
module.exports = router