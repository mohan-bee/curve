import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import User from './admin/User'
import Topics from './admin/topics/Topics'
import Problems from './admin/problems/Problems'

const tabs = ['Users', 'Topics', 'Problems']

const Admin = () => {
  const { users, getAllUsers } = useAuthStore()
  const [activeTab, setActiveTab] = useState('Users')

  useEffect(() => {
    getAllUsers()
  }, [])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Users':
        return <User users={users} />
      case 'Topics':
        return <Topics />
      case 'Problems':
        return <Problems />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="bg-[#1e1e1e] border-b border-[#2c2c2e] px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <nav className="space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === tab
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#2a2a2e] hover:bg-[#3a3a3e] text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Tab Content */}
      <main className="p-1">
        {renderTabContent()}
      </main>
    </div>
  )
}

export default Admin
