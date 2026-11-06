import React, { useState } from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = ({ topics, setFilteredTopics }) => {
  const [query, setQuery] = useState('')

  const filterTopics = (value) => {
    setQuery(value)

    if (value.trim() === '') {
      setFilteredTopics(topics)
      return
    }

    const normalized = value.trim().toLowerCase()
    const searchedTopics = (topics || []).filter(
      (topic) =>
        topic.title?.toLowerCase().includes(normalized) ||
        topic.description?.toLowerCase().includes(normalized)
    )
    setFilteredTopics(searchedTopics)
  }

  return (
    <div className="mb-10 flex flex-col items-center text-center gap-3">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
        Choose a Topic to Practice
      </h2>
      <p className="text-sm text-zinc-400 max-w-lg">
        Select a core data structure or algorithm track to launch a timed
        problem-solving sprint.
      </p>
      <div className="mt-2 w-full max-w-md bg-zinc-900 border border-zinc-800 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl h-12 flex items-center px-4 transition">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          onChange={(e) => filterTopics(e.target.value)}
          type="text"
          value={query}
          className="w-full h-full px-3 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
          placeholder="Search topics by name or description..."
        />
        {query && (
          <button
            type="button"
            onClick={() => filterTopics('')}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
