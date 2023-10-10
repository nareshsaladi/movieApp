import {Link} from 'react-router-dom'

import './index.css'

const TrendingMovieCard = props => {
  const {trendingMovieDetails} = props
  const {
    trendingNowPosterPath,
    trendingNowTitle,
    trendingNowId,
  } = trendingMovieDetails

  return (
    <Link to={`/movies/${trendingNowId}`}>
      <div className="trending-movie-card">
        <img
          src={trendingNowPosterPath}
          alt={trendingNowTitle}
          className="trending-movie-card-img"
        />
      </div>
    </Link>
  )
}

export default TrendingMovieCard
