import './index.css'

const Genres = props => {
  const {genresDetails} = props
  const {name} = genresDetails

  return (
    <li className="genres-list">
      <p className="genre-name">{name} </p>
    </li>
  )
}

export default Genres
