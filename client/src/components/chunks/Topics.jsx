import React, { useEffect, useMemo, useState } from 'react'
import TopicCard from './TopicCard'
import { useTopicStore } from '../../store/useTopicStore'
import SearchBar from './SearchBar'

const Topics = () => {
  const { topics, getAllTopics, getTopicsLoading } = useTopicStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getAllTopics()
  }, [getAllTopics])

  const topicList = useMemo(() => (Array.isArray(topics) ? topics : []), [topics])
  const visibleTopics = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return topicList
    }

    return topicList.filter((topic) => {
      const title = topic?.title?.toLowerCase() ?? ''
      const description = topic?.description?.toLowerCase() ?? ''

      return (
        title.includes(normalizedQuery) ||
        description.includes(normalizedQuery)
      )
    })
  }, [query, topicList])

  return (
    <>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        resultCount={visibleTopics.length}
        totalCount={topicList.length}
      />
      <div className="grid grid-cols-1 gap-5 px-10 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        {getTopicsLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              className="h-72 animate-pulse rounded-2xl border border-zinc-700 bg-zinc-800"
              key={`topic-skeleton-${index}`}
            />
          ))
        ) : visibleTopics.length > 0 ? (
          visibleTopics.map((topic) => (
            <TopicCard
              key={topic._id}
              isAdminPage={false}
              id={topic._id}
              title={topic.title}
              description={topic.description}
              coverImg={topic.coverImg}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 px-8 py-12 text-center">
            <h2 className="text-xl font-semibold text-white">
              {query.trim() ? 'No matching topics found' : 'No topics available'}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {query.trim()
                ? 'Try a different search term or clear the search box.'
                : 'Topics will appear here once they are added.'}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Topics
