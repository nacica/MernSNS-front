import React, { useContext, useEffect, useState } from "react";

import Share from "../share/Share";
import "./Feed.css";
import Post from "../post/Post";

// import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//タイムライン用とプロフィール用がある。
export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username       
        ? await axios.get(`/posts/profile/${username}`) //プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); //ホームの場合

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
          <Post key={post._id} post={post} /> 
         ))} 
      </div>
    </div>
  );
}