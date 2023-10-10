import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TrendingMovieCard from '../TrendingMovieCard'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNowMovies extends Component {
  state = {trendingMoviesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/movies-app/trending-movies`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedTrendingNowMoviesData = data.results.map(eachMovieData => ({
        trendingNowPosterPath: eachMovieData.poster_path,
        trendingNowTitle: eachMovieData.title,
        trendingNowId: eachMovieData.id,
      }))
      this.setState({
        trendingMoviesList: fetchedTrendingNowMoviesData,
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

  renderTrendingMoviesView = () => {
    const {trendingMoviesList} = this.state
    const {settings} = this.props

    return (
      <Slider {...settings}>
        {trendingMoviesList.map(eachTrendingMovieDetails => (
          <TrendingMovieCard
            key={eachTrendingMovieDetails.trendingNowId}
            trendingMovieDetails={eachTrendingMovieDetails}
          />
        ))}
      </Slider>
    )
  }

  onClickRetry = () => {
    this.getTrendingMoviesList()
  }

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderTrendingMoviesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="trending-now-slider-container">
        <h1 className="trending-now-heading">Trending Now</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default TrendingNowMovies
