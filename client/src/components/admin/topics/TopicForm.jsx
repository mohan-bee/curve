import React from 'react'
import { useState } from 'react'
import { useTopicStore } from '../../../store/useTopicStore'
import { ArrowBigLeft, ArrowLeft, CircleDashed } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { axiosInstance } from '../../../utils/axiosInstance'

const TopicForm = ({isEdit}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const {createTopic, createTopicLoading, editTopic} = useTopicStore()
    const {id} = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isEdit){
        await createTopic(title, description, coverImg)
        setTitle("")
        setDescription("")
        setCoverImg("")
        }
        if(isEdit){
            await editTopic(id, title, description, coverImg)
            navigate('/admin/topics')
        }

    }

    useEffect(() => {
        const fetchTopic = async () => {
            const res = await axiosInstance.get(`/topic/${id}`)
            console.log(res.data)
            setTitle(res.data.topic.title)
            setDescription(res.data.topic.description)
            setCoverImg(res.data.topic.coverImg)
        }
        if(id){
            fetchTopic()
        }
    }, [id])
  return (
    <div className=" min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <p 
        className='flex cursor-pointer hover:underline items-center gap-2'
        onClick={() => navigate('/admin/topics')}
        > <ArrowLeft size={15}/>  Back</p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Topic</h2>

        <form className="space-y-6" onSubmit={(e) =>  handleSubmit(e)}>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter topic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Write a brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="coverImg" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <img
        src={coverImg && coverImg}
        alt="Topic"
        className="w-1/2 h-48 object-fill"
      />
            <input
              type="text"
              id="coverImg"
              placeholder="https://example.com/image.png"
              value={coverImg}
              onChange={(e) => setCoverImg(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {!createTopicLoading ? 'Submit' : <CircleDashed className='animate-spin'/>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TopicForm
