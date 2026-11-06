import React, { useState, useEffect } from 'react'
import Topics from './chunks/Topics'
import Footer from './chunks/Footer'
import Info from './chunks/Info'
import Navbar from './chunks/Navbar'

const Home = () => {
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    const hasSeenInfo = JSON.parse(localStorage.getItem('info'))
    if (!hasSeenInfo) {
      setOpenPopup(true)
    }
  }, [])

  const handleClosePopup = () => {
    setOpenPopup(false)
    localStorage.setItem('info', JSON.stringify(true))
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar onOpenInfo={() => setOpenPopup(true)} />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Topics />
      </main>
      <Footer />
      {openPopup && <Info setOpenPopup={handleClosePopup} />}
    </div>
  )
}

export default Home
