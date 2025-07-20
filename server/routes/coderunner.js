const { coderunner } = require('../controllers/coderunner')

const router = require('express').Router()

router.post('/run', coderunner)

module.exports = router