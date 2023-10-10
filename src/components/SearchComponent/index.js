import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import SearchResult from '../SearchResult'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchComponent extends Component {
  state = {
    searchList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchResult()
  }

  getSearchResult = async () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput} `
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

        const fetchedResults = data.results.map(eachResult => ({
          id: eachResult.id,
          title: eachResult.title,
          posterPath: eachResult.poster_path,
        }))
        this.setState({
          searchList: fetchedResults,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    }
  }

  onSearchBtn = () => {
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      this.getSearchResult()
    }
  }

  //   onEnterSearchInput = event => {
  //     if (event.key === 'Enter') {
  //       this.getSearchResult()
  //     }
  //   }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSearchView = () => {
    const {searchList, searchInput} = this.state
    if (searchList.length > 0) {
      return (
        <ul className="search-list-container">
          {searchList.map(eachResult => (
            <SearchResult
              key={eachResult.id}
              searchResultDetails={eachResult}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="not-find-view-container">
        <img
          src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1695113226/Layer_2_qwfuuk.svg"
          alt="not find"
          className="not-find-img"
        />
        <p className="not-find-msg">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getSearchResult()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1695112780/Background-Complete_vs31m7.svg"
        alt="no data"
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
        return this.renderSearchView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-section-bg-container">
          <Header />
          <div className="search-input-bg-container">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                placeholder="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                // onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-btn"
                onClick={this.onSearchBtn}
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </div>
          </div>
          <div className="render-search-section-container">
            {this.renderView()}
          </div>
        </div>
      </>
    )
  }
}
export default SearchComponent
