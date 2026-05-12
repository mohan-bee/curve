import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ query, onQueryChange, resultCount, totalCount }) => {
  const handleChange = (e) => {
    onQueryChange(e.target.value)
  }

  return (
    <div className="mx-auto my-20 flex w-full max-w-3xl flex-col items-center gap-3 px-6">
      <label
        className="flex h-13 w-full items-center rounded-4xl border border-zinc-600 bg-zinc-900 px-4 text-zinc-300 shadow-sm transition focus-within:border-emerald-400"
        htmlFor="topic-search"
      >
        <Search aria-hidden="true" size={20} />
        <input
          onChange={handleChange}
          id="topic-search"
          type="text"
          value={query}
          className="h-full w-full bg-transparent px-3 text-white outline-none placeholder:text-zinc-500"
          placeholder="Search for topics..."
        />
      </label>
      <p className="text-sm text-zinc-400">
        Showing {resultCount} of {totalCount} topics
      </p>
    </div>
  )
}

export default SearchBar
