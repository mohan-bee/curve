import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const User = ({ users }) => {
  const [searchedUsers, setSearchedUsers] = useState(users ? users : [])
  const {blockUser, verifyUser} = useAuthStore()

  useEffect(() => {
    setSearchedUsers(users)
  }, [users])
  const searchUser = (query) => {
    setSearchedUsers(users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())))
  }


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className='bg-gray-200 w-100 border border-slate-300 my-10 rounded-md'>
        <input className='w-full h-full p-2 outline-none text-black' type="text" placeholder='Search for a user' onChange={(e) => searchUser(e.target.value)}/>
      </div>
      {searchedUsers && searchedUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {searchedUsers.map((user, i) => (
            <div
              key={user._id || i}
              className="bg-white shadow-md rounded-xl flex items-center justify-between p-4 border border-slate-200 hover:shadow-lg transition"
            > 
              <p className="text-lg font-medium text-gray-800">{user.username}</p>
              <button 
              onClick={
                () => {
                  if(user?.verified){
                    blockUser(user._id)
                  }else{
                    verifyUser(user._id)
                  }
                }}
              className={`
              ${user?.verified ? 'bg-red-500' : 'bg-green-500'}
              px-3 py-2 rounded-md border border-slate-200 shadow-2xs cursor-pointer
              `}>
                {user?.verified ? 'Block' : 'Verify'}</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No users found</p>
      )}
    </div>
  )
}

export default User
