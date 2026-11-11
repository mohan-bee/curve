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

  const visibleTopics = filteredTopics !== null ? filteredTopics : (topics || [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <SearchBar topics={topics} setFilteredTopics={setFilteredTopics} />
      {visibleTopics.length === 0 ? (
        <div className="text-center py-16 text-zinc-400 text-sm">
          No topics found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
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
      )}
    </section>
  )
}

export default Topics
