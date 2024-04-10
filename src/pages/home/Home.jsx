import React from "react";
import Feed from "../../components/timeline/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed profilePicture={profilePicture}/>
        <Rightbar />
      </div>
    </>
  );
}