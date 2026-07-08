import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faFacebookMessenger,faSquareYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHouse,  faShop, faUsers, faGamepad } from "@fortawesome/free-solid-svg-icons"
import { faBars,  faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import "./style.css"
import { useSelector } from "react-redux"

const Header = () => {
  const {user} = useSelector((user) => ({...user}));
  
  return (
   <header>
    <div className="header_left">
      <Link to="/" className="header_logo">
      <div className="circle">
        <FontAwesomeIcon icon={faFacebook} size="3x" color="blue" />
      </div>
       
      </Link> 
      <div className="search search1">
        <FontAwesomeIcon icon={faMagnifyingGlass} color="#65676b"  />
        <input type="text" placeholder="Search Facebook"  className="hide_input"/>
      </div>
    </div>
    <div className="header_middle">
      <Link to="/" className="middle_item hover1 active">
      <FontAwesomeIcon icon={faHouse} style={{fontSize: "1.5rem"}} color="#65676b"/>
      </Link>   
      <Link to="/" className="middle_item hover1">
      <FontAwesomeIcon icon={faSquareYoutube} style={{fontSize: "1.5rem"}} color="#65676b"/>
      </Link>   
      <Link to="/" className="middle_item hover1">
      <FontAwesomeIcon icon={faShop} style={{fontSize: "1.5rem"}} color="#65676b"/>
      <div className="middle_notification">7+</div>
      </Link>   
      <Link to="/" className="middle_item hover1">
      <FontAwesomeIcon icon={faUsers} style={{fontSize: "1.5rem"}} color="#65676b"/>
      </Link>   
      <Link to="/" className="middle_item hover1">
      <FontAwesomeIcon icon={faGamepad} style={{fontSize: "1.5rem"}} color="#65676b"/>
      </Link> 
    </div>
    <div className="header_right">
      <Link to="/" className="profile_link hover1">
        <img src={user?.pictures} alt="profile" className="profile_img"/>
        <span>{user?.last_name}</span>
      </Link>

      <div className="circle_icon hover1">
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="circle_icon hover1">
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </div>
      <div className="circle_icon hover1">
        <FontAwesomeIcon icon={faBell} />
        <div className="right_notification"></div>
      </div>
      <div className="circle_icon hover1">
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
      
   </header>
  )
}

export default Header
