import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TopRatedMovieCard from '../TopRatedMovieCard'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedMovies extends Component {
  state = {topRatedMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/movies-app/top-rated-movies`
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
      const fetchedTopRatedMoviesData = data.results.map(eachMovieData => ({
        posterPath: eachMovieData.poster_path,
        title: eachMovieData.title,
        id: eachMovieData.id,
      }))
      this.setState({
        topRatedMoviesList: fetchedTopRatedMoviesData,
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

  renderTopRatedMoviesView = () => {
    const {topRatedMoviesList} = this.state
    const {settings} = this.props

    return (
      <Slider {...settings}>
        {topRatedMoviesList.map(eachTopRatedMovieDetails => (
          <TopRatedMovieCard
            key={eachTopRatedMovieDetails.id}
            topRatedMovieDetails={eachTopRatedMovieDetails}
          />
        ))}
      </Slider>
    )
  }

  onClickRetry = () => {
    this.getTopRatedMovies()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderTopRatedMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="top-rated-movies-slider-container">
        <h1 className="top-rated-heading">Top Rated</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default TopRatedMovies
