import React, { useEffect, useState } from 'react'
import { useProblemStore } from '../../../store/useProblemStore'
import DescriptionBar from '../../chunks/DescriptionBar'
import { useNavigate } from 'react-router-dom'

const Problems = () => {
  const { problems, getAllProblems, deleteProblem } = useProblemStore()
  const [selectedProblem, setSelectedProblem] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    getAllProblems()
  }, [])    


  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#1c1c1e] border-r border-[#333] p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Problems</h2>
        <ul className="space-y-2">
          {(problems && problems.length > 0) && problems.map((problem) => (
            <li className={`flex items-center gap-2 hover:bg-[#2a2a2e] pr-2 rounded-md ${selectedProblem?._id === problem._id ? 'bg-[#2a2a2e]' : ''}`} key={problem._id}>
              <button
                onClick={() => setSelectedProblem(problem)}
                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#2a2a2e] transition ${
                  selectedProblem?._id === problem._id ? 'bg-[#2a2a2e]' : ''
                }`}
              >
                {problem.name}
              </button>
              <p className='cursor-pointer' onClick={() => navigate(`/admin/problems/edit/${problem._id}`)}>Edit</p>
              <p className='cursor-pointer' onClick={() => deleteProblem(problem._id)}>Delete</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Preview Panel */}
      <div className="w-3/4 p-8 overflow-y-auto">
        {selectedProblem ? (
          <DescriptionBar isAdmin={true} name={selectedProblem.name} description={selectedProblem.description} topic={selectedProblem.topic?.title}  examples={selectedProblem.testCases}/>
        ) : (
          <div className="text-gray-400 text-lg">Select a problem to preview.</div>
        )}
      </div>
      <button 
      className='absolute top-30 right-10 bg-white text-black p-2 rounded-md border border-slate-700 cursor-pointer hover:bg-gray-200'
      onClick={() => navigate(`/admin/problems/create`)}
      >Create Problem</button>

    </div>
  )
}

export default Problems
