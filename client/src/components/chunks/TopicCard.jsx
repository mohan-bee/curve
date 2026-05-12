import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopicStore } from '../../store/useTopicStore';
import { useGlobalStore } from '../../store/useGlobalStore';

const TopicCard = ({isAdminPage,id,title, description, coverImg}) => {
  const navigate = useNavigate()
  const {deleteTopic}= useTopicStore()
  const {startTimer} = useGlobalStore()
  const displayTitle = title || 'Untitled topic'
  const displayDescription = description || 'Practice problems for this topic.'

  return (
    <div className="flex min-h-72 flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 shadow-md transition hover:-translate-y-1 hover:border-emerald-500">
      <div className='flex h-36 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-900 p-5'>
        {coverImg ? (
          <img
            src={coverImg}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <h1 className="break-words text-center text-2xl font-black text-zinc-950 drop-shadow-xl md:text-3xl">{displayTitle.toUpperCase()}</h1>
        )}
      </div>
      <div className="flex-1 p-4">
        <h2 className="mb-2 text-lg font-semibold text-white">{displayTitle}</h2>
        <p className="line-clamp-3 text-sm text-zinc-400">{displayDescription}</p>
      </div>
      <div className="p-4 pt-0">
        {!isAdminPage && <button 
        className="w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 font-medium text-white transition duration-200 hover:bg-zinc-900"
        onClick={() => {
          navigate(`/curve/${id}`);
          startTimer()
        }}
        >
          Start practice
        </button>}
       {isAdminPage &&  <div className='flex flex-col gap-2'>
          <button 
          className="w-full cursor-pointer bg-orange-400  text-white font-medium py-2 px-4 rounded-md transition duration-200"
          onClick={() => navigate(`/admin/topics/edit/${id}`)}
          >
          Edit
        </button>
          <button 
          className="w-full cursor-pointer bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          onClick={() => deleteTopic(id)}
          >
          Delete
        </button>
        </div>}
      </div>
    </div>
  );
};

export default TopicCard;
