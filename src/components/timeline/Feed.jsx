import React, { useContext, useEffect, useState } from "react";

import Share from "../share/Share";
import "./Feed.css";
import Post from "../post/Post";


import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//タイムライン用とプロフィール用がある。
export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  console.log("Feedのプロップスのusernameが取れてるか確認");//　←　取れてる！
  console.log( username);//　←　取れてる！けど、ずっとendou.pngなぜならログインユーザーの情報だから
  console.log("FeedのprofilePictureが取れてるか確認");//　←　取れてる！


  useEffect(() => {
    const fetchPosts = async () => {
      // const API_URL =  process.env.API_URL
      const response = username      
        ? await axios.get(`https://mernsns-backend-0404-01.onrender.com/api/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`https://mernsns-backend-0404-01.onrender.com/api/posts/timeline/all`); //ホームの場合
        // : await axios.get(`https://mernsns-backend-0404-01.onrender.com/api/posts/timeline/${user._id}`); //ホームの場合
        // ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        // : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合

      setPosts(
        response.data
          .sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
         {posts.map((post) => (
            <Post key={post._id} post={post} username={username} />
          ))} 
      </div>
    </div>
  );
}