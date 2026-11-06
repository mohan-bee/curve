import { CircleDashed } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const TestCases = ({ testcases, testOutput, setPassed, passed, loading }) => {
  const [selected, setSelected] = useState(0)

  const isValidJSON = (str) => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (!testcases || !testOutput) return

    const newPassed = testcases.map((tc, index) => {
      if (isValidJSON(tc?.expected) && isValidJSON(testOutput[index]?.data)) {
        return (
          JSON.stringify(JSON.parse(tc.expected)) ===
          JSON.stringify(JSON.parse(testOutput[index]?.data))
        )
      }
      return false
    })

    setPassed(newPassed)
  }, [setPassed, testcases, testOutput])

  const passedCount = passed.filter((p) => p === true)?.length || 0
  const totalCount = testcases?.length || 0

  return (
    <div className="h-full w-full font-sans bg-zinc-900 border border-zinc-800 shadow-sm text-sm rounded-xl flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-40 border-r border-zinc-800 bg-zinc-900/80 text-zinc-300 overflow-y-auto">
        <div className="w-full font-semibold flex items-center justify-between px-4 bg-zinc-900 border-b border-zinc-800 py-2.5 text-xs">
          <span>
            {passedCount} / {totalCount} Passed
          </span>
          {!loading ? (
            <div
              className={`${
                totalCount > 0 && passedCount === totalCount
                  ? 'bg-emerald-400'
                  : 'bg-red-400'
              } w-2.5 h-2.5 rounded-full`}
            />
          ) : (
            <CircleDashed size={14} className="animate-spin text-emerald-400" />
          )}
        </div>
        {testcases?.map((tc, index) => (
          <button
            key={tc._id || index}
            onClick={() => setSelected(index)}
            className={`w-full flex items-center justify-between text-left px-4 py-2.5 border-b border-zinc-800/80 hover:bg-zinc-800/70 transition cursor-pointer text-xs ${
              selected === index
                ? 'bg-zinc-800 text-zinc-100 font-semibold'
                : 'bg-zinc-900 text-zinc-400'
            }`}
          >
            <span>Test Case {index + 1}</span>
            {!loading ? (
              <div
                className={`w-2.5 h-2.5 ${
                  passed[index] ? 'bg-emerald-400' : 'bg-red-400'
                } rounded-full`}
              />
            ) : (
              <CircleDashed size={14} className="animate-spin text-zinc-400" />
            )}
          </button>
        ))}
      </div>

      {/* Right Display Panel */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col gap-3">
          <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-300 text-xs font-mono">
            <span className="font-sans font-semibold text-zinc-400 mr-2">
              Input:
            </span>
            {testcases?.[selected]?.input || '—'}
          </div>
          <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-300 text-xs font-mono">
            <span className="font-sans font-semibold text-zinc-400 mr-2">
              Expected:
            </span>
            {testcases?.[selected]?.expected || '—'}
          </div>
          <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-300 text-xs font-mono">
            <span className="font-sans font-semibold text-zinc-400 mr-2">
              Output:
            </span>
            {testOutput?.[selected]?.data || '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestCases
