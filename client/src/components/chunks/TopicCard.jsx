import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTopicStore } from '../../store/useTopicStore';
import { useGlobalStore } from '../../store/useGlobalStore';

const TopicCard = ({isAdminPage,id,title, description, coverImg}) => {
  const navigate = useNavigate()
  const {deleteTopic}= useTopicStore()
  const {startTimer} = useGlobalStore()

  return (
    <div className="w-80 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      {/* <img
        src={coverImg}
        alt="Topic"
        className="w-full h-48 object-cover"
      /> */}
      <div className='bg-gradient-to-r flex items-center  justify-center from-orange-200 to-orange-50 h-50 w-full'>
          <h1 className="text-2xl md:text-3xl font-black text-center text-black drop-shadow-xl">{title.toUpperCase()}</h1>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="p-4 pt-0">
        {!isAdminPage && <button 
        className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        onClick={() => {
          navigate(`/curve/${id}`);
          startTimer()
        }}
        >
          Start
        </button>}
       {isAdminPage &&  <div className='flex flex-col gap-2'>
          <button 
          className="w-full cursor-pointer bg-orange-400  text-white font-medium py-2 px-4 rounded-md transition duration-200"
          onClick={() => navigate(`/admin/topics/edit/${id}`)}
          >
          Edit
        </button>
          <button 
          className="w-full cursor-pointer bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          onClick={() => deleteTopic(id)}
          >
          Delete
        </button>
        </div>}
      </div>
    </div>
  );
};

export default TopicCard;
