import React, { useState } from 'react'
import SearchBar from './chunks/SearchBar'
import Topics from './chunks/Topics'
import Footer from './chunks/Footer'
import DescriptionBar from './chunks/DescriptionBar'
import Info from './chunks/Info'
import Navbar from './chunks/Navbar'

const Home = () => {
  const [openPopup, setOpenPopup] = useState(true)
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Topics/>
      <Footer />
      {openPopup && <Info setOpenPopup={setOpenPopup}/>}
    </div>
  )
}

export default Home