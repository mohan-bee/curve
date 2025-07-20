import React, { useEffect } from 'react'
import TopicForm from './TopicForm'
import { useTopicStore } from '../../../store/useTopicStore'
import TopicCard from '../../chunks/TopicCard'
import { useNavigate } from 'react-router-dom'

const Topics = () => {
  const { topics, getAllTopics, getTopicsLoading } = useTopicStore()
  const navigate = useNavigate()
  useEffect(() => {
    getAllTopics()
  }, [getAllTopics])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Topics</h1>
        </header>

        {/* Loading */}
        {getTopicsLoading && (
          <p className="text-gray-600 text-center">Loading...</p>
        )}

        {/* Topics List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(topics && topics.length > 0) &&
            topics.map((topic) => (
            <TopicCard isAdminPage={true} key={topic._id} id={topic._id} title={topic.title} description={topic.description} coverImg={topic.coverImg} />
            ))}
        </div>
      </div>
      <button 
      className='absolute top-30 right-10 bg-black text-white p-2 rounded-md border border-slate-700 cursor-pointer hover:bg-gray-800'
      onClick={() => navigate(`/admin/topics/create`)}
      >Create Problem</button>
    </div>
  )
}

export default Topics
