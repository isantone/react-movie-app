import { useEffect, useState } from 'react'

import { TrendingMovieDocument } from '../api.types'
import { getTrendingMovies } from '../appwrite-api'

const TrendingMoviesSection = () => {
  const [trendingMovieList, setTrendingMovieList] = useState<
    TrendingMovieDocument[]
  >([])

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
          <h2>
            Trending <span className="text-gradient">Movies</span>
          </h2>

          <ul>
            {trendingMovieList.map((trendingMovieDocument, index) => (
              <li key={trendingMovieDocument.$id}>
                <p>{index + 1}</p>

                <img src={trendingMovieDocument.poster_url} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

export default TrendingMoviesSection
