import { Circle, CircleDashed } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TestCases = ({ testcases, testOutput, setPassed, passed, loading }) => {
  const [selected, setSelected] = useState(0);

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };


  useEffect(() => {
    if (!testcases || !testOutput) return;

    const newPassed = testcases.map((tc, index) => {
      if (
        isValidJSON(tc?.expected) &&
        isValidJSON(testOutput[index]?.data)
      ) {
        return (
          JSON.stringify(JSON.parse(tc.expected)) ===
          JSON.stringify(JSON.parse(testOutput[index]?.data))
        );
      }
      return false;
    });

    setPassed(newPassed);
  }, [testcases, testOutput]);

  return (
    <div className="h-full w-full bg-white border border-gray-300 shadow-sm font-mono text-sm rounded-md flex overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-36 border-r border-gray-200 bg-gray-50">
        <div className='w-full font-bold flex items-center justify-between px-5.5 bg-white border border-slate-300 py-2'>
          {passed.filter(p => p == true)?.length}/{testcases?.length}
          {!loading ? <div
          className={`${passed.filter(p => p == true)?.length == testcases?.length ? 'bg-green-400': 'bg-red-400'} w-3 h-3 rounded-full`}
          >

          </div> : (
            <CircleDashed size={15} className='animate-spin'/>
          )}
        </div>
        {testcases?.map((tc, index) => (
          <button
            key={tc._id}
            onClick={() => setSelected(index)}
            className={`w-full flex items-center justify-around text-left px-4 py-2 border-b border-gray-200 hover:bg-gray-100 ${
              selected === index
                ? 'bg-white font-semibold text-black'
                : 'text-gray-600'
            }`}
          >
            <div>Test Case {index + 1}</div>
            {!loading ? <div
              className={`w-3 h-3 ${
                passed[index] ? 'bg-green-400' : 'bg-red-400'
              } rounded-full`}
            ></div> : (
              <div>
                <CircleDashed size={15} className='animate-spin'/>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Right Display Panel */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col gap-5 rounded-md p-4 space-y-2">
          <div className="bg-gray-100 p-3 rounded-md border border-slate-200">
            <span className="font-semibold">Input:</span>{' '}
            {testcases?.[selected]?.input || ''}
          </div>
          <div className="bg-gray-100 p-3 rounded-md border border-slate-200">
            <span className="font-semibold">Expected:</span>{' '}
            {testcases?.[selected]?.expected || ''}
          </div>
          <div className="bg-gray-100 p-3 rounded-md border border-slate-200">
            <span className="font-semibold">Output:</span>{' '}
            {testOutput?.[selected]?.data || ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCases;
