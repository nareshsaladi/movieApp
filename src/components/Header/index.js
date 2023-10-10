import {Component} from 'react'

import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

class Header extends Component {
  state = {isClick: false}

  onClickSearchButton = () => {}

  onClickBtn = () => {
    this.setState(prevState => ({isClick: !prevState.isClick}))
  }

  render() {
    const {isClick} = this.state

    return (
      <>
        <nav className="nav-container">
          <div className="header-container">
            <Link to="/" className="link-style">
              <img
                src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1694434642/Group_7399_ct0pr5.png"
                alt="website logo"
                className="movies-logo-img"
              />
            </Link>
            <div className="nav-items-container">
              <ul className="home-popular-list-container">
                <li className="home">
                  <Link to="/" className="link-style">
                    Home
                  </Link>
                </li>
                <li className="popular ">
                  <Link to="/popular" className="link-style">
                    Popular
                  </Link>
                </li>
              </ul>
              <div className="search-about-container">
                <Link to="/search" className="link-style">
                  <button
                    type="button"
                    testid="searchButton"
                    className="search-btn"
                    onClick={this.onClickSearchButton}
                  >
                    <HiOutlineSearch className="search-icon" />
                  </button>
                </Link>

                <Link to="/account" className="link-style">
                  <img
                    src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1694434665/Avatar_slbuzq.png"
                    alt="profile"
                    className="about-img"
                  />
                </Link>
                <button
                  type="button"
                  className="mobile-view-btn"
                  onClick={this.onClickBtn}
                >
                  <img
                    src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1695114930/add-to-queue_1_g4jftd.png"
                    alt="main view"
                    className="mobile-view-img"
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>
        {isClick && (
          <ul className="home-popular-about-list-container-mobile-view">
            <li className="home">
              <Link to="/" className="link-style">
                Home
              </Link>
            </li>
            <li className="popular">
              <Link to="/popular" className="link-style">
                Popular
              </Link>
            </li>
            <li className="about-mobile-view">
              <Link to="/account" className="link-style">
                Account
              </Link>
            </li>
          </ul>
        )}
      </>
    )
  }
}

export default Header
