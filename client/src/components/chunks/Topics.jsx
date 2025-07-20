import React, { useEffect } from 'react'
import TopicCard from './TopicCard'
import { useTopicStore } from '../../store/useTopicStore'

const Topics = () => {
  const {topics, getAllTopics} = useTopicStore()

  useEffect(() => {
    getAllTopics()
  }, [])

  return (
    <>
      <div className='flex flex-wrap px-10 gap-4 items-center justify-center'>
      {topics && topics?.map(topic => (
          <TopicCard  key={topic._id} isAdminPage={false}id={topic._id} title={topic.title} description={topic.description} coverImg={topic.coverImg}/>
      ))}
      </div>
    </>
  )
}

export default Topics