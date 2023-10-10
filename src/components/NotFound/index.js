import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-container">
      <h1 className="lost-your-way">Lost Your Way ?</h1>
      <p className="error-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="goto-home-btn">
          GO To Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
