import {Link} from 'react-router-dom'
import './index.css'

const TopRatedMovieCard = props => {
  const {topRatedMovieDetails} = props
  const {posterPath, title, id} = topRatedMovieDetails

  return (
    <Link to={`/movies/${id}`}>
      <div className="top-rated-movie-card">
        <img
          src={posterPath}
          alt={title}
          className="top-rated-movie-card-img"
        />
      </div>
    </Link>
  )
}

export default TopRatedMovieCard
