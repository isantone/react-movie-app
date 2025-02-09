import { useState } from 'react'
import classNames from 'classnames'

import { Movie } from '../api.types'

const MovieCard = ({
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    overview,
  },
}: {
  movie: Movie
}) => {
  const [expanded, setExpanded] = useState(false)
  const cardClassName = classNames('movie-card', { expanded })

  return (
    <div className={cardClassName} onClick={() => setExpanded(!expanded)}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : 'no-movie.png'
        }
        alt={title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3 title={title}>{title}</h3>

        <div className="info">
          <div className="rating">
            <p>★</p>
            <p>{vote_average?.toFixed(1) || 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">{release_date?.split('-')[0] || 'N/A'}</p>
        </div>

        {overview && (
          <p className="description" title={overview}>
            {overview}
          </p>
        )}
      </div>
    </div>
  )
}

export default MovieCard
