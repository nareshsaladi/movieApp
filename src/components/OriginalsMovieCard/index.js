import {Link} from 'react-router-dom'

import './index.css'

const OriginalsMovieCard = props => {
  const {OriginalsMovieDetails} = props
  const {
    originalsPosterPath,
    originalsTitle,
    originalsId,
  } = OriginalsMovieDetails

  return (
    <Link to={`/movies/${originalsId}`}>
      <div className="originals-movie-card">
        <img
          src={originalsPosterPath}
          alt={originalsTitle}
          className="originals-movie-card-img"
        />
      </div>
    </Link>
  )
}

export default OriginalsMovieCard
