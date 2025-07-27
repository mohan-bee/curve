import React, { useState, useEffect } from 'react'
import SearchBar from './chunks/SearchBar'
import Topics from './chunks/Topics'
import Footer from './chunks/Footer'
import DescriptionBar from './chunks/DescriptionBar'
import Info from './chunks/Info'
import Navbar from './chunks/Navbar'

const Home = () => {
  const [openPopup, setOpenPopup] = useState(false)

  useEffect(() => {
    const hasSeenInfo = JSON.parse(localStorage.getItem("info"))
    if (!hasSeenInfo) {
      setOpenPopup(true)
    }
  }, [])

  const handleClosePopup = () => {
    setOpenPopup(false)
    localStorage.setItem("info", true)
  }

  return (
    <div>
      <Navbar />
      <Topics />
      <Footer />
      {openPopup && <Info setOpenPopup={handleClosePopup} />}
    </div>
  )
}

export default Home
