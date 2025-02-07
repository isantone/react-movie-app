import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="header.jpg" alt="Header Banner" className="mb-10" />

          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll enjoy
          </h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}

export default App
