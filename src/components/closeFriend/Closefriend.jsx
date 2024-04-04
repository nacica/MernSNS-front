import React from "react";
import "./CloseFriend.css";


export default function CloseFriend({ user }) {
  const PROFILE_FOLDER = process.env.REACT_APP_PROFILE_FOLDER;
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
            

      <a href={PROFILE_FOLDER + user.username}>
        <img
              src={PUBLIC_FOLDER + user.profilePicture}
              alt=""
              className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </a>


    </li>
  );
}