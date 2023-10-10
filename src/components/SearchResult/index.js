import {Link} from 'react-router-dom'
import './index.css'

const SearchResult = props => {
  const {searchResultDetails} = props
  const {posterPath, title, id} = searchResultDetails
  return (
    <Link to={`/movies/${id}`}>
      <li className="search-result">
        <img src={posterPath} alt={title} className="search-img" />
      </li>
    </Link>
  )
}
export default SearchResult
