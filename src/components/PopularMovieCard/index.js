import {Link} from 'react-router-dom'

import './index.css'

const PopularMovieCard = props => {
  const {popularMovieDetails} = props
  const {popularTitle, popularPosterPath, popularId} = popularMovieDetails

  return (
    <Link to={`/movies/${popularId}`}>
      <li key={popularId} className="popular-movie-card">
        <img
          src={popularPosterPath}
          alt={popularTitle}
          className="popular-movie-img"
        />
      </li>
    </Link>
  )
}
export default PopularMovieCard
