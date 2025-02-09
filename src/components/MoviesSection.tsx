import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

import { fetchMovies } from '../api'
import { updateSearchCount } from '../appwrite-api'

import MovieCard from './MovieCard'
import Spinner from './Spinner'

const MoviesSection = ({ searchTerm }: { searchTerm: string }) => {
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

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
    <section className="all-movies">
      <h2 className="mt-[40px] flex items-center gap-[20px]">
        Movies {isLoading && <Spinner />}
      </h2>

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
  )
}

export default MoviesSection
