import React, { useContext } from "react";
import "./Topbar.css";
import {Chat, Notifications, Search,} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;



  
  const handlebtn = () => {
    localStorage.removeItem('user'); // ローカルストレージからuser情報を削除
    // window.location.href = 'http://localhost:3000'; 
    window.location.href = 'https://zero404-mernsns-front01.onrender.com/'; 
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物は何ですか？"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PUBLIC_FOLDER + user.profilePicture
                  : PUBLIC_FOLDER + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <button onClick={handlebtn}>ログアウト</button>
        </div>
      </div>
    </div>
  );
}