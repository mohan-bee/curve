import { CircleCheck, Dot } from 'lucide-react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DescriptionBar = ({name,topic, description, examples, solved, visited, isAdmin}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 text-sm bg-[#0f0f0f] text-white">
      <div className='flex justify-start'>
        {name ? (
          <h1 className="text-2xl font-bold mb-4 text-zinc-200">{name}</h1>
        ) : (
          <div className='w-1/2 h-5 rounded-md animate-pulse mb-4  bg-zinc-800'></div>  
        )}

        {/* {solved && <p className='text-green-500 flex items-center gap-2'><CircleCheck /> Solved</p>} */}
        {/* {(visited && !solved) && <p className='text-yellow-400 flex items-center gap-1'><Dot /> Attempted</p>} */}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-medium text-xl text-zinc-200 mb-1">Description</h2>

          {description ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p className="text-zinc-200 leading-relaxed mb-2" {...props} />
                ),
                code: ({ node, inline, className, children, ...props }) => (
                  <code
                    className={`bg-zinc-800 px-1 py-0.5 rounded text-sm font-mono ${
                      inline ? '' : 'block p-2'
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-2" {...props} />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-lg font-semibold mt-3 mb-1" {...props} />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          ) : (
            <div className="w-1/2 h-10 rounded-md animate-pulse mb-4 bg-zinc-800"></div>
          )}
        </div>

        <div>
          <h2 className="font-medium text-sl text-white mb-1">Example</h2>
          <div className='flex flex-col gap-2'>
            {examples &&  examples.length == 0 && (
            <div className='flex flex-col'>
               <div className='w-1/2 h-10 rounded-md animate-pulse mb-4  bg-zinc-800'></div>  
               <div className='w-1/2 h-10 rounded-md animate-pulse mb-4  bg-zinc-800'></div>  
            </div> 
            )}
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
         {topic ? (
            <p className="text-white leading-relaxed">
              {topic}
            </p>
          ) : (
            <div className='w-1/2 h-10 rounded-md animate-pulse mb-4  bg-zinc-800'></div>  
          )}
        </div>
      </div>
    </div>
  )
}

export default DescriptionBar
