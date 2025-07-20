const { getAllProblems,getOneProblem, createProblem, editProblem, deleteProblem, runTestCases } = require('../controllers/problem')
const isAdmin = require('../middlewares/isAdmin')

const router = require('express').Router()

router.get('/all', getAllProblems)
router.post('/create',isAdmin, createProblem)
router.put('/edit/:id',isAdmin, editProblem)
router.delete('/delete/:id',isAdmin, deleteProblem)
router.get('/:id',getOneProblem)
router.get('/testcase/:id',runTestCases)
module.exports = router