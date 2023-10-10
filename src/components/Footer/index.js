import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-section">
    <div className="icons-container">
      <FaGoogle className="google-icon" />
      <FaTwitter className="twitter-icon" />
      <FaInstagram className="instagram-icon" />
      <FaYoutube className="youtube-icon" />
    </div>
    <p className="contact">Contact US</p>
  </div>
)
export default Footer
