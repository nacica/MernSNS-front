import {Bookmark, Home, MessageRounded, Notifications, Person, Search, Settings,  } from "@mui/icons-material";
  import React from "react";
  import { useContext } from "react";
  import "./Sidebar.css";
  import { Users } from "../../dummyData";

  import { Link } from "react-router-dom";
  import CloseFriend from "../closeFriend/Closefriend";
  import { AuthContext } from "../../context/AuthContext";


  
  export default function Sidebar() {
    // eslint-disable-next-line
    const { user } = useContext(AuthContext);

    function getUserDataFromLocalStorage() {
      const userDataJSON = localStorage.getItem('user'); // 'userData' キーで保存されているデータを取得
      if (userDataJSON) {
        return JSON.parse(userDataJSON); // JSON形式の文字列をJavaScriptオブジェクトにパースして返す
      } else {
        console.log("ユーザー情報を取得できません1"); // ユーザーデータがローカルストレージに保存されていない場合はエラーメッセージを表示
        return null;
      }
    }
    
    // ローカルストレージからユーザーデータを取得
    const userData = getUserDataFromLocalStorage();
    
    // 取得したユーザーデータをログに出力する
    // console.log(userData);
    // console.log(userData.username);

    
    return (

      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Home className="sidebarIcon" />
               <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <span className="sidebarListItemText">ホーム</span>
              </Link> 
            </li>
            <li className="sidebarListItem">
              <Person className="sidebarIcon" />

              {userData && userData.username && (
                <Link
                    to={`/profile/${userData.username}`}
                    style={{ textDecoration: "none", color: "black" }}
                >
                <span className="sidebarListItemText">プロフィール</span>
                </Link>
              )}
            </li>
            <li className="sidebarListItem">
              <Search className="sidebarIcon" />
              <span className="sidebarListItemText">検索（準備中）</span>
            </li>
            <li className="sidebarListItem">
              <Notifications className="sidebarIcon" />
              <span className="sidebarListItemText">通知（準備中）</span>
            </li>
            <li className="sidebarListItem">
              <MessageRounded className="sidebarIcon" />
              <span className="sidebarListItemText">メッセージ（準備中）</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
                <span className="sidebarListItemText">ブックマーク（準備中）</span>
            </li>

            <li className="sidebarListItem">
              <Settings className="sidebarIcon" />
              <span className="sidebarListItemText">設定（準備中）</span>
            </li>
          </ul>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
             {Users.map((user) => (
              <CloseFriend key={user.id} user={user} />
            ))} 
          </ul>
        </div>
      </div>
    );
  }