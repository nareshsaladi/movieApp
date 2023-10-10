import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import Genres from '../Genres'
import Languages from '../Languages'
import SimilarMovies from '../SimilarMovies'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieItemDetails: {},
    genres: [],
    languages: [],
    similarMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      console.log(data)
      const fetchedMovieDetails = {
        id: data.movie_details.id,
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        overview: data.movie_details.overview,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const fetchedGenres = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))

      const fetchedLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )

      const fetchedSimilarMovies = data.movie_details.similar_movies.map(
        eachSimilarMovie => ({
          id: eachSimilarMovie.id,
          title: eachSimilarMovie.title,
          posterPath: eachSimilarMovie.poster_path,
        }),
      )

      this.setState({
        movieItemDetails: fetchedMovieDetails,
        genres: fetchedGenres,
        languages: fetchedLanguages,
        similarMoviesList: fetchedSimilarMovies,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div testid="loader" className="movie-details-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </>
  )

  renderMovieDetailsView = () => {
    const {movieItemDetails, genres, languages, similarMoviesList} = this.state

    const {
      backdropPath,
      budget,
      overview,
      releaseDate,
      title,
      runtime,
      voteAverage,
      voteCount,
      adult,
    } = movieItemDetails

    const movieAdult = adult ? 'A' : 'U/A'

    const hours = Math.floor(runtime / 100)
    const minutes = runtime % 100

    return (
      <>
        <div
          className="banner-section-container"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Header />
          <div className="movie-details-banner-section-container">
            <div className="title-and-overview-container">
              <h1 className="movie-title">{title} </h1>
              <div className="runtime-adult-container">
                <p className="movie-runtime">
                  {hours}h {minutes}m
                </p>
                <p className="movie-adult">{movieAdult} </p>
              </div>
              <p className="movie-overview">{overview}</p>
              <button type="button" className="play-btn">
                Play
              </button>
            </div>
          </div>
          <div className="hidden-container">
            <p className="hidden-text">.</p>
          </div>
        </div>

        <div className="movie-item-details-sub-container">
          <div className="genres-language-ratting-budget-container">
            <div className="genres-container">
              <h3 className="genres">Genres</h3>
              <ul className="genres-list-container">
                {genres.map(eachGenre => (
                  <Genres key={eachGenre.id} genresDetails={eachGenre} />
                ))}
              </ul>
            </div>
            <div className="language-container">
              <h3 className="language">Audio Available</h3>
              <ul className="language-list-container">
                {languages.map(eachLanguage => (
                  <Languages
                    key={eachLanguage.id}
                    languageDetails={eachLanguage}
                  />
                ))}
              </ul>
            </div>

            <div className="vote-container">
              <h3 className="vote-average-heading">Rating Average</h3>
              <p className="vote-average"> {voteAverage} </p>
              <h3 className="vote-cont-heading">Rating Count</h3>
              <p className="vote-count">{voteCount} </p>
            </div>
            <div className="budget-and-release-date-container">
              <h3 className="budget-heading">Budget </h3>
              <p className="budget">{budget} </p>
              <h3 className="release-date-heading">Release Date</h3>
              <p className="release-date">{releaseDate} </p>
            </div>
          </div>
          <div className="similar-movies-container">
            <h1 className="more-like-this-heading">More Like This </h1>

            <ul className="similar-movies-list-container">
              {similarMoviesList.map(eachSimilarMovie => (
                <SimilarMovies
                  key={eachSimilarMovie.id}
                  similarMovieDetails={eachSimilarMovie}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  onClickRetry = () => {
    this.getMovieItemDetails()
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="movie-details-failure-view-container">
        <FailureView onClickRetry={this.onClickRetry} />
      </div>
    </>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderMovieDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-container">
        <div className="render-view-container">{this.renderView()}</div>
        <Footer />
      </div>
    )
  }
}

export default MovieItemDetails
