import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import OriginalsMovieCard from '../OriginalsMovieCard'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OriginalsMovies extends Component {
  state = {originalsMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginalsMovies()
  }

  getOriginalsMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/movies-app/originals`
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
      const fetchedOriginalsMoviesData = data.results.map(eachMovieData => ({
        originalsPosterPath: eachMovieData.poster_path,
        originalsTitle: eachMovieData.title,
        originalsId: eachMovieData.id,
      }))
      this.setState({
        originalsMoviesList: fetchedOriginalsMoviesData,
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

  renderOriginalsMoviesView = () => {
    const {originalsMoviesList} = this.state
    const {settings} = this.props

    return (
      <Slider {...settings}>
        {originalsMoviesList.map(eachOriginalsMovieDetails => (
          <OriginalsMovieCard
            key={eachOriginalsMovieDetails.originalsId}
            OriginalsMovieDetails={eachOriginalsMovieDetails}
          />
        ))}
      </Slider>
    )
  }

  onClickRetry = () => {
    this.getOriginalsMovies()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderOriginalsMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="originals-slider-container">
        <h1 className="originals-heading">Originals</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default OriginalsMovies
