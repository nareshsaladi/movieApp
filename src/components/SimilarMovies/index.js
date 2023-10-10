import './index.css'

const SimilarMovies = props => {
  const {similarMovieDetails} = props
  const {title, posterPath} = similarMovieDetails

  return (
    <li className="similar-movie-card">
      <img src={posterPath} alt={title} className="similar-movie-img" />
    </li>
  )
}

export default SimilarMovies
