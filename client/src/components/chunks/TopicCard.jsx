import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopicStore } from '../../store/useTopicStore';
import { useGlobalStore } from '../../store/useGlobalStore';
import { ArrowRight, Clock3 } from 'lucide-react';

const TopicCard = ({isAdminPage,id,title, description}) => {
  const navigate = useNavigate()
  const {deleteTopic}= useTopicStore()
  const {startTimer} = useGlobalStore()
  const initials = (title || 'Topic')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('')

  return (
    <article className="group flex min-h-72 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg transition hover:-translate-y-1 hover:border-emerald-400/70">
      <div className='flex h-36 items-center justify-between bg-zinc-950 p-5'>
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-400 text-xl font-black text-zinc-950">
          {initials}
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-cyan-400/30 px-2.5 py-1 text-xs font-semibold text-cyan-200">
          <Clock3 size={14} /> Timed
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{description}</p>
      </div>
      <div className="p-5 pt-0">
        {!isAdminPage && <button 
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300"
        onClick={() => {
          navigate(`/curve/${id}`);
          startTimer()
        }}
        >
          Start <ArrowRight size={17} />
        </button>}
       {isAdminPage &&  <div className='flex flex-col gap-2'>
          <button 
          className="w-full cursor-pointer rounded-lg bg-orange-400 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-orange-300"
          onClick={() => navigate(`/admin/topics/edit/${id}`)}
          >
          Edit
        </button>
          <button 
          className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
          onClick={() => deleteTopic(id)}
          >
          Delete
        </button>
        </div>}
      </div>
    </article>
  );
};

export default TopicCard;
