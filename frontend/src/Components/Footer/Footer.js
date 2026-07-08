import { Link } from "react-router-dom";

const Footer = () => {
  return (
     <footer className='login_footer'>
          <div className="login_footer_wrap">
            
              <Link to="/">English (UK)</Link>
              <Link to="/">Français (FR)</Link>
              <Link to="/">العربية</Link>
              <Link to="/">বাংলা</Link>
              <Link to="/">Deutsch</Link>
              <Link to="/">Português (BR)</Link>
              <Link to="/">Pyccknn</Link>
              <Link to="/">Espanol</Link>
              <Link to="/">Bosanski</Link>
              <Link to="/">Bosanski</Link>
              <Link to="/">Italiano</Link>
              <Link to="/">हिन्दी</Link>
              <Link to="/">中文(简体)</Link>
              <Link to="/">日本語</Link>
              <Link to="/">한국어</Link>
              <Link to="/">Türkçe</Link>
              <Link to="/">Nederlands</Link>
              <Link to="/" className='footer_square'><span>&#43;</span></Link>
            </div>
            <div className='footer_splitter'></div>
            <div className="login_footer_wrap">
              <Link to="/">Sign Up</Link>
              <Link to="/">Log In</Link>
              <Link to="/">Messenger</Link>
              <Link to="/">Facebook Lite</Link>
              <Link to="/">Watch</Link>
              <Link to="/">People</Link>
              <Link to="/">Pages</Link>
              <Link to="/">Page Categories</Link>
              <Link to="/">Places</Link>
              <Link to="/">Games</Link>
              <Link to="/">Locations</Link>
              <Link to="/">Marketplace</Link>
              <Link to="/">Facebook Pay</Link>
              <Link to="/">Groups</Link>
              <Link to="/">Jobs</Link>
              <Link to="/">Oculus</Link>
              <Link to="/">Portal</Link>
              <Link to="/">Instagram</Link>
              <Link to="/">Bulletin</Link>
              <Link to="/">Local</Link>
              <Link to="/">Fundraisers</Link>
              <Link to="/">Services</Link>
              <Link to="/">Voting Information Center</Link>
              <Link to="/">Privacy</Link>
              <Link to="/">Cookies</Link>
              <Link to="/">AdChoices</Link>
              <Link to="/">Terms</Link>
              <Link to="/">Help</Link>
            </div>
            <div className="login_footer_wrap">
              <Link to="/" style={{fontSize: "12px", marginTop: "10px"  }}></Link>
              { " "}
              meta @ 2026- Facebook, Inc.
            </div>
        </footer>
  )
}

export default Footer
