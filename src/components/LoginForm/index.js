import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMessage: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitError: true, errorMessage})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="user-input"
          id="username"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="user-input"
          id="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-main-container">
        <img
          src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1694434642/Group_7399_ct0pr5.png"
          alt="login website logo"
          className="movies-logo"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="login-text-heading"> Login</h1>
            <div className="input-container">{this.renderUserNameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            {showSubmitError && <p className="error-msg">*{errorMessage} </p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
