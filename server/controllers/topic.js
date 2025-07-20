const Problem = require('../models/Problem')
const Topic = require('../models/Topic')
const User = require('../models/User')


const createTopic = async (req,res) => {
    try {
        const {title, description, coverImg} = req.body
        const newTopic = new Topic( {title, description, coverImg})
        await newTopic.save()
        return res.status(201).json({msg: "Topic created successfully ", topic: newTopic})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}
const getOneTopic = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Topic ID is required." });
    }

    const topicProblems = await Problem.find({ topic: id }).populate("topic");

    if (!topicProblems || topicProblems.length === 0) {
      return res.status(404).json({ msg: "No problems found for this topic!" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: "User not found or unauthorized." });
    }

    // Normalize visitedProblem IDs to strings
    const visitedIds = new Set(user.visitedProblems.map((pid) => pid.toString()));

    // Filter unvisited problems
    const unvisited = topicProblems.filter(
      (problem) => !visitedIds.has(problem._id.toString())
    );

    let selectedProblem;

    if (unvisited.length > 0) {
      const randIdx = Math.floor(Math.random() * unvisited.length);
      selectedProblem = unvisited[randIdx];
      console.log("Unvisited problem selected:", selectedProblem._id);
    } else {
      // All visited, fallback to any problem
      const randIdx = Math.floor(Math.random() * topicProblems.length);
      selectedProblem = topicProblems[randIdx];
      console.log("All visited. Returning a random fallback:", selectedProblem._id);
    }

    // Update user record to add problem to visitedProblems
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { visitedProblems: selectedProblem._id },
    });

    return res.status(200).json({
      msg: "Here is you problem !",
      randomProblem: selectedProblem,
    });
  } catch (error) {
    console.error("Error in getOneTopic:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
      desc: error.message,
    });
  }
};


const getAllTopics = async (req,res) => {
     try {
        const topics = await Topic.find()
        if (!topics){
            return res.status(404).json({msg: "Topics not found !"})
        }
        return res.status(200).json({msg: "Topic Got successfully ", topics})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const editTopic = async (req,res) => {
    try {
        const {id} = req.params
        const {title, description, coverImg} = req.body
        const topic = await Topic.findByIdAndUpdate(id,  {title, description, coverImg}, {new: true})
        return res.status(201).json({msg: "Topic Updated successfully ", topic})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const deleteTopic = async (req,res) => {
    try {
        const {id} = req.params
        await Topic.findByIdAndDelete(id)
        const topics = await Topic.find()
        return res.status(201).json({msg: "Topic Deleted successfully ", topics})
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", desc: error.message})
    }
}

const exitCurve = async (req,res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {visitedProblems: []})
        return res.status(200).json({msg: "Exited from playground successfully"})
    } catch (error) {
        
    }
}
module.exports = {createTopic,getOneTopic, getAllTopics, editTopic, deleteTopic, exitCurve}

