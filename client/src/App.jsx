import React, { useEffect, useState } from 'react'
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
import Mobile from './components/Mobile'

import { useAuthStore } from './store/useAuthStore'
import { shouldShowMobileWorkspaceNotice } from './utils/uiHelpers'

const App = () => {
  const { getProfile, user, loading } = useAuthStore()
  const location = useLocation()
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    getProfile()
  }, [getProfile])

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (shouldShowMobileWorkspaceNotice(location.pathname, viewportWidth)) {
    return <Mobile />
  }

  const publicPaths = ['/', '/login', '/verify']
  const isPublicRoute = publicPaths.includes(location.pathname)

  if (loading || (user == null && !isPublicRoute)) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-sm text-zinc-400 tracking-wide">Loading Curve workspace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30">
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
    </div>
  )
}

export default App
