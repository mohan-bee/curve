import React, { useEffect, useState } from 'react'
import TopicCard from './TopicCard'
import { useTopicStore } from '../../store/useTopicStore'
import SearchBar from './SearchBar'

const Topics = () => {
  const { topics, getAllTopics } = useTopicStore()
  const [filteredTopics, setFilteredTopics] = useState(null)

  useEffect(() => {
    getAllTopics()
  }, [getAllTopics])

  useEffect(() => {
    setFilteredTopics(topics)
  }, [topics])

  const visibleTopics = filteredTopics ?? topics ?? []

  return (
    <section>
      <SearchBar topics={topics} setFilteredTopics={setFilteredTopics} />
      {visibleTopics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTopics.map((topic) => (
            <TopicCard
              key={topic._id}
              isAdminPage={false}
              id={topic._id}
              title={topic.title}
              description={topic.description}
              coverImg={topic.coverImg}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
          <p className="text-sm text-zinc-400">
            No matching topics found. Try a different search keyword.
          </p>
        </div>
      )}
    </section>
  )
}

export default Topics
