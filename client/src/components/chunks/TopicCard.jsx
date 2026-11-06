import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Pencil, Trash2 } from 'lucide-react'
import { useTopicStore } from '../../store/useTopicStore'
import { useGlobalStore } from '../../store/useGlobalStore'

const TopicCard = ({ isAdminPage, id, title, description }) => {
  const navigate = useNavigate()
  const { deleteTopic } = useTopicStore()
  const { startTimer } = useGlobalStore()

  return (
    <div className="group bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-200 rounded-2xl shadow-md overflow-hidden flex flex-col">
      <div className="relative flex items-center justify-center bg-gradient-to-br from-emerald-500/20 via-emerald-900/30 to-zinc-900 border-b border-zinc-800/80 h-36 w-full px-4">
        <h3 className="text-xl sm:text-2xl font-black tracking-wide text-center text-emerald-300 group-hover:text-emerald-200 transition">
          {(title || '').toUpperCase()}
        </h3>
      </div>

      <div className="flex-1 p-5 space-y-2">
        <h4 className="text-base font-semibold text-zinc-100">{title}</h4>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="p-5 pt-0">
        {!isAdminPage ? (
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 group-hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-zinc-950 cursor-pointer text-zinc-100 font-semibold py-2.5 px-4 rounded-xl text-sm transition duration-200"
            onClick={() => {
              navigate(`/curve/${id}`)
              startTimer()
            }}
          >
            <span>Start Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 cursor-pointer bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-300 font-medium py-2 px-3 rounded-xl text-xs transition"
              onClick={() => navigate(`/admin/topics/edit/${id}`)}
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center gap-1.5 cursor-pointer bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 text-red-300 font-medium py-2 px-3 rounded-xl text-xs transition"
              onClick={() => deleteTopic(id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopicCard
