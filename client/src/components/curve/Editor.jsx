import React, { useEffect, useState } from 'react';
import EditorMonaco from '@monaco-editor/react';
import { useRunner } from '../../store/useRunner';
import { CircleDashed, Play, RotateCcw, SkipForward, Skull, Timer } from 'lucide-react';
import { useTopicStore } from '../../store/useTopicStore';
import { useGlobalStore } from '../../store/useGlobalStore';

const Editor = ({noOfInputs,user, testcases, setTestOutput, setLoading, loading, topicId, setPassed}) => {
  
  const [code, setCode] = useState(`def solution():\n    # return your solution ...`);
  const {runCode} = useRunner()
  
  const {getOneTopic} = useTopicStore()
  const {timer} = useGlobalStore()
  
  const handleEditorChange = (value) => {
    setCode(value);
  };


  const resetCode = () => {
const inputs = []

  for(let i=0; i<noOfInputs; i++){
    inputs.push(String.fromCharCode(i + 65))
  }
  setCode(`def solution(${inputs.join(",")}):\n    # return your solution here ...`)
  }
  useEffect(() => {
    resetCode()
  } , [noOfInputs])


  // useEffect(() => {
  //   const codeTxt = `print("Hello")`
  //   runCode(code)
  // }, [])

 const runTheGivenCode = async () => {
  setLoading(true)
  try {
    setTestOutput([])
    for (const test of testcases) {
      console.log(test)
      const args = test.input.trim().split(" ");
      const argValues = [];

      for (let i = 2; i < args.length; i += 4) {
        try {
          const corrected = args[i].replace(/^'(.*)'$/, '"$1"');
          const parsed = JSON.parse(corrected);
          argValues.push(parsed);
        } catch (e) {
          console.warn(`Invalid JSON at index ${i}:`, args[i]);
        }
      }


      const output = await runCode(code, argValues);
      setTestOutput(prev => [...prev, output])
    }
  } catch (error) {
    console.error("Error in runTheGivenCode:", error);
  }
  finally{
    setLoading(false)
  }
};

const allPass = () => {
  setPassed(Array(testcases.length).fill(true))
}

  return (
    <div className='w-full h-full bg-[#1E1E1E] p-5'>
      {/* Editor Header  */}
      <div className='flex items-center justify-between px-6 bg-zinc-800 p-1 py-2 text-white rounded-md border border-zinc-700'>
        <div className='bg-white px-2 py-1 rounded-md border text-black text-sm border-slate-300'>
          Python
        </div>
        <div className='flex gap-2'>
          <button 
          className='flex cursor-pointer items-center gap-2 bg-black text-sm text-white px-2 py-1 rounded-md'
          onClick={runTheGivenCode}
          >
            {!loading ? <Play size={15}/> : <CircleDashed size={15} className='animate-spin'/>}
            Run
        </button>
        <button 
        className='flex cursor-pointer items-center gap-2 text-sm bg-yellow-200   text-black px-2 py-1 rounded-md'
        onClick={() =>{ getOneTopic(topicId)}}
        >
          <SkipForward size={15}/>
          Skip
        </button>
        <button 
        className='flex cursor-pointer items-center gap-2 text-sm bg-gray-200   text-black px-2 py-1 rounded-md'
        onClick={() =>{ resetCode()}}
        >
          <RotateCcw  size={15}/>
        </button>
        {user?.isAdmin && <button 
        className='flex cursor-pointer items-center gap-2 text-sm bg-green-200   text-black px-2 py-1 rounded-md'
        onClick={() =>{ allPass()}}
        >
          <Skull size={15}/>
          Pass All
        </button>}
        </div>
        <div className='flex w-20 items-center gap-2 text-sm'>
          <Timer size={15}/>
          {Math.floor(timer / 60)}:{(timer % 60).toString().length == 1 ? `0${(timer % 60)}` : timer % 60}
        </div>
      </div>
      {/* Editor */}
      <div className='p-2'>
        <EditorMonaco  
          height="55vh"
          defaultLanguage="python"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: 'Fira Code, Menlo, monospace',
            minimap: { enabled: false },
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default Editor;


