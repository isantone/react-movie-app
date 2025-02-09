import { Models } from 'appwrite'

export interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Movie {
  id: number
  overview: string
  original_language: string
  poster_path: string
  release_date: string
  title: string
  vote_average: number
}

export interface TrendingMovieDocument extends Models.Document {
  count: number
  poster_url: string
  movie_id: string
}
