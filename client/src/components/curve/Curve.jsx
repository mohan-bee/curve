import React, { useEffect, useState } from 'react'
import Editor from './Editor'
import TestCases from './TestCases'
import DescriptionBar from '../chunks/DescriptionBar'
import { useParams } from 'react-router-dom'
import { useTopicStore } from '../../store/useTopicStore'
import { Circle, Loader } from 'lucide-react'
import { useGlobalStore } from '../../store/useGlobalStore'
import Solved from './Solved'

const Curve = ({ user }) => {
  const { id } = useParams()
  const { getOneTopic, randomProblem, exitCurve } = useTopicStore()
  const { problemSolved, noOfProblemsSolved, stopTimer } = useGlobalStore()

  const [testOutput, setTestOutput] = useState([])
  const [passed, setPassed] = useState(Array(4).fill(false))
  const [loading, setLoading] = useState(false)
  const [visited, setVisited] = useState(false)
  const [solved, setSolved] = useState(false)
  const target = 3

  const noOfInputs =
    randomProblem?.testCases &&
    randomProblem?.testCases[0]?.input.split(' , ').length

  useEffect(() => {
    setLoading(true)
    try {
      if (id) {
        getOneTopic(id)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }, [id, getOneTopic])

  useEffect(() => {
    const allPassed = passed.every((p) => p === true)
    if (allPassed) {
      console.log('All test cases passed. Reloading...')
      // window.location.reload();
      problemSolved()
      console.log('No of problem solved', noOfProblemsSolved)
      getOneTopic(id)
      if (noOfProblemsSolved == target){
        setSolved(true)
        stopTimer()
      }
    }
  }, [passed])

  useEffect(() => {
    if (randomProblem && user?.visitedProblems) {
      const isVisited = user.visitedProblems.includes(randomProblem._id)
      console.log('Visited?', isVisited)
      setVisited(isVisited)
    }
  }, [randomProblem, user])

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-gray-800">
      {/* Left - Problem Description */}
      {solved && <Solved />}
      <div className="border-r border-gray-300 overflow-auto p-6 bg-black">
        <DescriptionBar
          visited={visited}
          name={randomProblem?.name}
          topic={randomProblem?.topic?.title}
          description={randomProblem?.description}
          examples={randomProblem?.testCases}
        />
      </div>

      {/* Right - Editor + Test Cases */}
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto">
          <Editor
            topicId={id}
            user={user}
            loading={loading}
            setLoading={setLoading}
            setTestOutput={setTestOutput}
            testcases={randomProblem?.testCases}
            noOfInputs={noOfInputs}
            setPassed={setPassed}
          />
        </div>
        <div className="h-1/3 overflow-auto bg-white p-4 border-t border-gray-200">
          <TestCases
            loading={loading}
            passed={passed}
            setPassed={setPassed}
            testOutput={testOutput}
            testcases={randomProblem?.testCases}
          />
        </div>
      </div>
    </div>
  )
}

export default Curve
