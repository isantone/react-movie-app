import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const url = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(url, API_OPTIONS)
      const data = await response.json()
      const movies = data.results || []

      if (!response.ok) {
        throw new Error(data.status_message)
      }

      setMovieList(movies)
    } catch (error) {
      setMovieList([])
      setErrorMessage('Failed to fetch movies. Please try again later.')
      console.error(`Failed to fetch movies. ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="header.jpg" alt="Header Banner" className="mb-10" />

          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll enjoy
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="flex mt-[40px] gap-[20px] items-center">
            Movies {isLoading && <Spinner />}
          </h2>

          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className="text-white">
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
