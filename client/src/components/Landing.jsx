import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrafficCone } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-screen bg-gradient-to-b from-cyan-400 to-cyan-900 overflow-hidden flex items-center justify-center flex-col gap-6">
      
      {/* Floating Space Elements */}
      <motion.img
        src="https://static.vecteezy.com/system/resources/thumbnails/020/004/136/small_2x/moon-illustration-planet-png.png"
        alt="Moon"
        className="absolute top-10 left-10 w-24 md:w-32 opacity-70"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      <motion.img
        src="https://static.vecteezy.com/system/resources/previews/011/178/727/large_2x/saturn-on-space-background-elements-of-this-image-furnished-by-nasa-free-png.png"
        alt="Saturn"
        className="absolute bottom-10 right-10 w-28 md:w-36 opacity-50"
        animate={{ x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* Text and Button */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-7xl md:text-8xl font-black text-white drop-shadow-xl"
      >
        INTRODUCING CURVE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="text-lg flex items-center gap-2 text-slate-200 font-light"
      >
        Under Construction <TrafficCone />
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20, scale: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        onClick={() => navigate('/login')}
        className="px-6 py-3 cursor-pointer bg-gradient-to-l from-slate-600 to-slate-900 text-white rounded-xl text-xl shadow-md"
      >
        Dive in →
      </motion.button>
    </div>
  )
}

export default Landing
