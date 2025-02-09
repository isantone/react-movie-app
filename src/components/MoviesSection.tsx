import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

import { fetchMovies } from '../api'
import { Movie } from '../api.types'
import { updateSearchCount } from '../appwrite-api'

import MovieCard from './MovieCard'
import Search from './Search'
import Spinner from './Spinner'

const MoviesSection = () => {
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  useEffect(() => {
    loadMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  async function loadMovies(query = '') {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const movies = await fetchMovies(query)

      setMovieList(movies)

      if (query && movies.length) {
        await updateSearchCount(movies[0])
      }
    } catch {
      setMovieList([])
      setErrorMessage('Failed to fetch movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="all-movies">
        <h2 className="flex items-center gap-[20px]">
          <span className="text-gradient">Movies</span>

          {isLoading && <Spinner />}
        </h2>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default MoviesSection
