import './index.css'

const FailureView = props => {
  const onClickRetryBtn = () => {
    const {onClickRetry} = props
    onClickRetry()
  }
  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dfs2rk9ys/image/upload/v1695439401/alert-triangle_ur1cp7.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p className="something-wrong-text">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-btn" onClick={onClickRetryBtn}>
        Try Again
      </button>
    </div>
  )
}
export default FailureView
