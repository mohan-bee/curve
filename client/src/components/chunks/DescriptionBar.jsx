import { CircleCheck, Dot } from 'lucide-react'
import React from 'react'

const DescriptionBar = ({name,topic, description, examples, solved, visited, isAdmin}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 text-sm bg-[#0f0f0f] text-white">
      <div className='flex justify-between'>
        <h1 className="text-xl font-semibold mb-4 text-white">{name || "Name not provided"}</h1>
        {/* {solved && <p className='text-green-500 flex items-center gap-2'><CircleCheck /> Solved</p>} */}
        {/* {(visited && !solved) && <p className='text-yellow-400 flex items-center gap-1'><Dot /> Attempted</p>} */}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-medium text-white mb-1">Description</h2>
          <p className="text-white leading-relaxed">
            {description || "Description Not Provided"}
          </p>
        </div>

        <div>
          <h2 className="font-medium text-white mb-1">Example</h2>
          <div className='flex flex-col gap-2'>
            {examples && examples?.slice(0,!isAdmin ? 2 : examples.length).map((example, idx) => (
            <pre key={idx} className="bg-gray-800 text-white rounded p-3 text-sm overflow-x-auto">
{`Input: ${example.input}
Expected: ${example.expected}
`}
          </pre>
          ))}
          </div>
        </div>

        <div>
          <h2 className="font-medium text-white mb-1">Topic</h2>
          <p>{topic || "Topic not provided"}</p>
        </div>
      </div>
    </div>
  )
}

export default DescriptionBar
