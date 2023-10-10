import './index.css'

const Languages = props => {
  const {languageDetails} = props
  const {englishName} = languageDetails

  return (
    <li className="languages-list">
      <p className="language-name"> {englishName} </p>
    </li>
  )
}

export default Languages
