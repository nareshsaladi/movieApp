import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const About = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="about-container">
      <Header />
      <div className="about-section-bg">
        <div className="about-section">
          <h1 className="account-heading">Account</h1>
          <hr className="horizontal-line" />
          <div className="membership-container">
            <p className="membership">Member ship</p>
            <div className="e-mail-and-password-container">
              <p className="e-mail">naresh@gmail.com</p>
              <p className="password">Password: ********</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="plan-details-container">
            <p className="plan-details">Plan details</p>
            <p className="premium">Premium</p>
            <p className="ultra-hd">Ultra HD</p>
          </div>
          <hr className="horizontal-line" />

          <div className="btn-container">
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(About)
