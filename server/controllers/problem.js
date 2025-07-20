const Problem = require('../models/Problem')


const createProblem = async (req,res) => {
    try {
        const {name, description,topic, testcases} = req.body
        const newProblem = new Problem({name, description,topic, testCases:testcases})
        await newProblem.save()
        return res.status(201).json({msg: "Problem Created Successfully !! "})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const getAllProblems = async (req,res) => {
    try {
        const problems = await Problem.find().populate("topic")
        if(!problems){
            return res.status(400).json({msg: "Failed to Get Problems"})
        }
        return res.status(200).json({msg: "Here is the List of Problems", problems})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const getOneProblem = async (req,res) => {
    try {
        const {id} = req.params
        const problem = await Problem.findById(id).populate("topic")
        if(!problem){
            return res.status(400).json({msg: "Failed to Get Problems"})
        }
        return res.status(200).json({msg: "Here is the Problem", problem})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const editProblem = async (req,res) => {
    try {
        const {id} = req.params
        const {name, description,topic, testcases} = req.body
        const problem = await Problem.findByIdAndUpdate(id, {name, description,topic, testCases: testcases}, {new: true})
        return res.status(201).json({msg: "Problem Edited Successfully !! ", problem})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const deleteProblem = async (req,res) => {
    try {
        const {id} = req.params
        await Problem.findByIdAndDelete(id)
        const problems = await Problem.find()
        return res.status(201).json({msg: "Problem Deleted Successfully !! ", problems})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const runTestCases = async (req,res) => {
    try {
        const {id} = req.params
        const problem = await Problem.findById(id)
        const testcases = problem.testCases.map(p => {
            p.output == p.expected
        })
        return res.status(200).json({msg: "Test Cases", testcases})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

module.exports = {createProblem, getAllProblems,getOneProblem, editProblem, deleteProblem, runTestCases}