import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ topics, setFilteredTopics }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === '') {
      setFilteredTopics(topics)
      return
    }

    const searchedTopics = topics.filter(topic =>
      topic.title.toLowerCase().includes(value.trim().toLowerCase())
    )
    setFilteredTopics(searchedTopics)
  }

  return (
    <div className="my-25 flex items-center justify-center">
      <div className="border border-zinc-500 ml-2 rounded-4xl w-100 h-13 flex items-center px-3">
        <Search />
        <input
          onChange={handleChange}
          type="text"
          value={query}
          className="w-full h-full px-3 outline-none"
          placeholder="Search for topics..."
        />
      </div>
    </div>
  )
}

export default SearchBar
