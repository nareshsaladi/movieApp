import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import PopularMovieCard from '../PopularMovieCard'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularMovies extends Component {
  state = {popularMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/movies-app/popular-movies`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedPopularMoviesData = data.results.map(eachMovieData => ({
        popularPosterPath: eachMovieData.poster_path,
        popularTitle: eachMovieData.title,
        popularId: eachMovieData.id,
      }))
      this.setState({
        popularMoviesList: fetchedPopularMoviesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderPopularMoviesView = () => {
    const {popularMoviesList} = this.state

    return (
      <ul className="popular-movies-list-container">
        {popularMoviesList.map(eachPopularMovieDetails => (
          <PopularMovieCard
            key={eachPopularMovieDetails.popularId}
            popularMovieDetails={eachPopularMovieDetails}
          />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1695112780/Background-Complete_vs31m7.svg"
        alt="failure view"
        className="no-data-image"
      />

      <p className="something-wrong-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-btn"
        onClick={this.onClickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderPopularMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="popular-movies-container">
          <Header />
          <div className="render-Popular-movies-section-container">
            {this.renderView()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default PopularMovies
