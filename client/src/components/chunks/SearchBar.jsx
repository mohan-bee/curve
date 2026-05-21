import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ topics, setFilteredTopics }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setFilteredTopics(null)
      return
    }

    const searchedTopics = (topics || []).filter(topic =>
      topic.title.toLowerCase().includes(value.trim().toLowerCase())
    )
    setFilteredTopics(searchedTopics)
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex h-12 items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-zinc-400 shadow-lg transition focus-within:border-cyan-400">
        <Search size={18} />
        <input
          onChange={handleChange}
          type="text"
          value={query}
          className="h-full w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
          placeholder="Search for topics..."
        />
      </div>
    </div>
  )
}

export default SearchBar
