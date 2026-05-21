import React, { useEffect, useState } from 'react'
import TopicCard from './TopicCard'
import { useTopicStore } from '../../store/useTopicStore'
import SearchBar from './SearchBar'
import { BookOpen, SearchX } from 'lucide-react'

const Topics = () => {
  const {topics, getAllTopics} = useTopicStore()
  const [filteredTopics, setFilteredTopics] = useState(null)

  useEffect(() => {
    getAllTopics()
  }, [getAllTopics])

  const visibleTopics = filteredTopics === null ? topics || [] : filteredTopics

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
      <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
            <BookOpen size={16} /> Topics
          </p>
          <h2 className="text-3xl font-black text-white sm:text-4xl">Choose a practice lane</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Focus on one concept at a time, start the timer, and keep the session moving.
          </p>
        </div>
        <SearchBar topics={topics} setFilteredTopics={setFilteredTopics}/>
      </section>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {visibleTopics.map(topic => (
          <TopicCard key={topic._id} isAdminPage={false} id={topic._id} title={topic.title} description={topic.description}/>
        ))}
      </div>

      {visibleTopics.length === 0 && (
        <div className="mt-10 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <SearchX className="mb-3 text-zinc-500" size={28} />
          <h3 className="text-lg font-bold text-white">No topics found</h3>
          <p className="mt-2 max-w-md text-sm text-zinc-500">Try a different search term or check back after topics are added.</p>
        </div>
      )}
    </main>
  )
}

export default Topics
