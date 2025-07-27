import React, { useEffect, useState } from 'react'
import TopicCard from './TopicCard'
import { useTopicStore } from '../../store/useTopicStore'
import SearchBar from './SearchBar'

const Topics = () => {
  const {topics, getAllTopics} = useTopicStore()
  const [filteredTopics, setFilteredTopics] = useState(topics)
  useEffect(() => {
    getAllTopics()
  }, [])

  return (
    <>
    <SearchBar topics={topics} setFilteredTopics={setFilteredTopics}/>
      <div className='flex flex-wrap px-10 gap-4 items-center justify-center'>
      {filteredTopics ? filteredTopics?.map(topic => (
          <TopicCard  key={topic._id} isAdminPage={false}id={topic._id} title={topic.title} description={topic.description} coverImg={topic.coverImg}/>
      )) : topics?.map(topic => (
          <TopicCard  key={topic._id} isAdminPage={false}id={topic._id} title={topic.title} description={topic.description} coverImg={topic.coverImg}/>
      ))}
      </div>
    </>
  )
}

export default Topics