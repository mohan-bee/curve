import React, { useEffect, useState } from 'react'
import { useTopicStore } from '../../../store/useTopicStore'
import { useProblemStore } from '../../../store/useProblemStore'
import DescriptionBar from '../../chunks/DescriptionBar'
import { axiosInstance } from '../../../utils/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'

const ProblemForm = ({isEdit}) => {
  const { topics, getAllTopics } = useTopicStore()
  const { createProblem,editProblem } = useProblemStore()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('')
  const [testcases, setTestcases] = useState([{ input: "[1,2,3]", expected: "2" }])
  const [input, setInput] = useState('')
  const [expected, setExpected] = useState('')

  const {id} = useParams()  

  const navigate = useNavigate()

  const topicName = topics && topics.filter(t => t._id == topic)[0]?.title

  useEffect(() => {
    getAllTopics()
  }, []) // fetch only once on mount

  useEffect(() => {
          const fetchTopic = async () => {
              const res = await axiosInstance.get(`/problem/${id}`)
              console.log(res.data.problem.name)
              setName(res.data.problem.name)
              setDescription(res.data.problem.description)
              setTestcases(res.data.problem.testCases)
              setTopic(res.data.problem.topic?._id)
          }
          if(id){
              fetchTopic()
          }
      }, [id])

  useEffect(() => {
    if (topics && topics.length > 0 && !topic) {
      setTopic(topics[0]._id)
    }
  }, [topics])

  const handleSubmit = async (e) => {
    e.preventDefault()
  if(isEdit){
    await editProblem(id, name, description, topic, testcases)
    navigate('/admin/problems')
  }
  else{
    await createProblem(name, description, topic, testcases )
    setName("")
    setDescription("")
    setTestcases([])
  }
  }

  const addTestCase = () => {
    if (!input.trim() || !expected.trim()) return
    setTestcases(prev => [...prev, { input: input.trim(), expected: expected.trim() }])
    setInput("")
    setExpected("")
  }

  const deleteTestCase = (idx) => {
    setTestcases(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className='flex'>
      <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-[#1c1c1e] rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-white">Create New Problem</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Problem Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter problem name"
              className="w-full bg-[#2a2a2e] text-white px-4 py-2 border border-[#3a3a3e] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem..."
              className="w-full bg-[#2a2a2e] text-white px-4 py-2 border border-[#3a3a3e] rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
            />
          </div>

          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm text-gray-400 mb-1">Topic</label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#2a2a2e] text-white px-4 py-2 border border-[#3a3a3e] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500/50"
            >
              {(topics && topics.length === 0) && <option disabled>Loading topics...</option>}
              {topics &&  topics.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Testcases */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Testcases</label>
            <div className="space-y-1 text-sm text-gray-300 mb-4">
              {testcases &&  testcases.map((tc, i) => (
                <div key={i} className="bg-[#2a2a2e] flex items-center justify-between rounded px-3 py-2 font-mono">
                  <div>
                    <span className="text-orange-400">Input:</span> {tc.input} &nbsp;
                    <span className="text-green-400">Output:</span> {tc.expected}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteTestCase(i)}
                    className="bg-red-500/80 p-1 rounded-md text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="flex-1 bg-[#2a2a2e] text-white px-4 py-2 border border-[#3a3a3e] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                placeholder='Input'
              />
              <input
                value={expected}
                onChange={(e) => setExpected(e.target.value)}
                type="text"
                className="flex-1 bg-[#2a2a2e] text-white px-4 py-2 border border-[#3a3a3e] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500/50 placeholder-gray-500"
                placeholder='Expected Output'
              />
              <button
                type="button"
                onClick={addTestCase}
                className="bg-orange-500 hover:bg-orange-600 border border-orange-500 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {!isEdit ? 'Submit Problem' : 'Edit Problem'}
          </button>
        </form>
      </div>
    </div>
    <DescriptionBar name={name} topic={topicName} description={description} examples={testcases}/>
    </div>

  )
}

export default ProblemForm
