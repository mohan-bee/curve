import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTopicStore } from '../../store/useTopicStore'
import { useGlobalStore } from '../../store/useGlobalStore'
import { getTopicInitials } from '../../utils/uiHelpers'

const TopicCard = ({ isAdminPage, id, title, description }) => {
  const navigate = useNavigate()
  const { deleteTopic } = useTopicStore()
  const { startTimer } = useGlobalStore()

  return (
    <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 hover:border-cyan-500/40 transition rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-500/90 to-cyan-900 h-44 w-full px-4">
        <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/30 text-emerald-200 mb-2">
          {getTopicInitials(title)}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-center text-white drop-shadow">
          {String(title || '').toUpperCase()}
        </h2>
      </div>
      <div className="flex-1 p-5 space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <div className="p-5 pt-0">
        {!isAdminPage && (
          <button
            type="button"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold py-2.5 px-4 rounded-xl cursor-pointer transition duration-200"
            onClick={() => {
              navigate(`/curve/${id}`)
              startTimer()
            }}
          >
            Start Practice
          </button>
        )}
        {isAdminPage && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="w-full cursor-pointer bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => navigate(`/admin/topics/edit/${id}`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => deleteTopic(id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopicCard
