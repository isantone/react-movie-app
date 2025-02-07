import React from 'react'

const Search = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (term: string) => void
}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search through all movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
