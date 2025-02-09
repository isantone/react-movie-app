const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

export const fetchMovies = async (query: string) => {
  try {
    const url = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(url, API_OPTIONS)
    const data = await response.json()

    return data.results || []
  } catch (error) {
    console.error(`Failed to fetch movies. ${error}`)
  }
}
