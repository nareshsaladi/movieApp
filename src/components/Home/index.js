import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import TrendingNowMovies from '../TrendingNowMovies'
import TopRatedMovies from '../TopRatedMovies'
import OriginalsMovies from '../OriginalsMovies'
import FailureView from '../FailureView'
import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {moviesData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOriginals()
  }

  getOriginals = async () => {
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
      const dataLength = data.results.length
      const randomPosterDetails =
        data.results[Math.floor(Math.random() * dataLength)]
      const fetchedMoviesData = {
        id: randomPosterDetails.id,
        overview: randomPosterDetails.overview,
        backdropPath: randomPosterDetails.backdrop_path,
        posterPath: randomPosterDetails.poster_path,
        title: randomPosterDetails.title,
      }
      this.setState({
        moviesData: fetchedMoviesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div testid="loader" className="loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  renderBannerSectionView = () => {
    const {moviesData} = this.state
    const {title, overview, backdropPath} = moviesData
    return (
      <>
        <div
          className="banner-section-bg-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="banner-section-sub-container">
            <h1 className="movie-title">{title} </h1>
            <p className="movie-description">{overview} </p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
          <div className="hidden-container">
            <p className="hidden-text">.</p>
          </div>
        </div>
      </>
    )
  }

  onClickRetry = () => {
    this.getOriginals()
  }

  renderFailureView = () => (
    <div>
      <Header />
      <FailureView onClickRetry={this.onClickRetry} />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderBannerSectionView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-bg-container">
        {this.renderView()}
        <div className="slider-section">
          <TrendingNowMovies settings={settings} />
          <TopRatedMovies settings={settings} />
          <OriginalsMovies settings={settings} />
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
