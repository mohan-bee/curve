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

const App = () => {
  const { getProfile, user, loading } = useAuthStore()
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1073)

  // Fetch user profile
  useEffect(() => {
    getProfile()
  }, [getProfile])

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1073)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Show mobile version immediately on mobile screen
  if (isMobile) {
    return <Mobile />
  }

  // Show loading screen while user data is being fetched
  const publicPaths = ['/', '/login', '/verify']
  const isPublicRoute = publicPaths.includes(location.pathname)

  if (loading || (user == null && !isPublicRoute)) {
    return <div>Loading...</div>
  }
  // if(loading || user == null){
  //   return null
  // }


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
