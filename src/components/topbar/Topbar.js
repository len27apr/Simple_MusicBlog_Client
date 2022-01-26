import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const {user} = useContext(Context);
  // const PF='http://localhost:8000/';
  
  const homeButtonClasses=['topListItemHome',user && 'userHome'];

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className={homeButtonClasses.join(" ")}>
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItemAbout">ABOUT</li>
          <li className="topListItemContact">CONTACT</li>
          {user && <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>}
          {user && <li className="topListItem"><Link to={`/?username=${user.username}`} className='link'>
              MY POSTS
            </Link></li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
           { user.profilePic ? <img
              className="topImg"
              src={process.env.REACT_APP_BACKEND_IMAGE_URL+user.profilePic}
              alt=""
            />:<img class='unknownImage'src='unknown image' alt=''/>}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
