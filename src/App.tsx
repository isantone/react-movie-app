import Search from './components/Search'
import TrendingMoviesSection from './components/TrendingMoviesSection'
import MoviesSection from './components/MoviesSection'
import { useState } from 'react'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="header.jpg" alt="Header Banner" className="mb-10" />

          <div>
            <h1>
              Find best <span className="text-gradient">Movies</span>
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </header>

        <TrendingMoviesSection />

        <MoviesSection searchTerm={searchTerm} />
      </div>
    </main>
  )
}

export default App
