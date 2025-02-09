import React, { useEffect, useState } from 'react'
import { getTrendingMovies } from '../appwrite'
import { Models } from 'appwrite'

const TrendingMoviesSection = () => {
  const [trendingMovieList, setTrendingMovieList] = useState<Models.Document[]>(
    [],
  )

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()

      setTrendingMovieList(movies || [])
    } catch (error) {
      console.error(`Failed to fetch trending movies. ${error}`)
    }
  }

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <>
      {trendingMovieList.length && (
        <section className="trending">
          <h2>Trending Movies</h2>

          <ul>
            {trendingMovieList.map((movie, index) => (
              <li key={movie.$id}>
                <p>{index + 1}</p>

                <img src={movie.poster_url} alt="movie.title" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default TrendingMoviesSection
