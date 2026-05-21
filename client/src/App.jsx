import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Landing from './components/Landing'
import Login from './components/Login'
import OTP from './components/OTP'
import Home from './components/Home'
import Admin from './components/Admin'
import TopicForm from './components/admin/topics/TopicForm'
import Topics from './components/admin/topics/Topics'
import ProblemForm from './components/admin/problems/ProblemForm'
import Problems from './components/admin/problems/Problems'
import Curve from './components/curve/Curve'

import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const { getProfile, user, loading } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const publicPaths = ['/', '/login', '/verify']
  const isPublicRoute = publicPaths.includes(location.pathname)

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 text-sm text-zinc-300 shadow-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Loading Curve
        </div>
      </div>
    )
  }

  if (user == null && !isPublicRoute) {
    return <Navigate to="/login" />
  }

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={user?.isAdmin ? <Admin /> : <Navigate to="/home" />} />
      <Route path="/admin/topics" element={user?.isAdmin ? <Topics /> : <Navigate to="/home" />} />
      <Route path="/admin/topics/create" element={user?.isAdmin ? <TopicForm isEdit={false} /> : <Navigate to="/home" />} />
      <Route path="/admin/topics/edit/:id" element={user?.isAdmin ? <TopicForm isEdit={true} /> : <Navigate to="/home" />} />
      <Route path="/admin/problems" element={user?.isAdmin ? <Problems /> : <Navigate to="/home" />} />
      <Route path="/admin/problems/create" element={user?.isAdmin ? <ProblemForm isEdit={false} /> : <Navigate to="/home" />} />
      <Route path="/admin/problems/edit/:id" element={user?.isAdmin ? <ProblemForm isEdit={true} /> : <Navigate to="/home" />} />
      {/* Public Routes */}
      
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={user?.verified ? <Navigate to="/home" /> : <Login />} />
      <Route path="/verify" element={user?.verified ? <Navigate to="/home" /> : <OTP />} />

      {/* Protected Routes */}
      <Route path="/home" element={user?.verified ? <Home /> : <Navigate to="/login" />} />
      <Route path="/curve/:id" element={user?.verified ? <Curve user={user} /> : <Navigate to="/login" />} />

      
    </Routes>
  )
}

export default App
