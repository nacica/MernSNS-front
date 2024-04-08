import { MoreVert } from "@mui/icons-material";
// import React from "react";
import "./Post.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { Users } from "../../dummyData";
// import { format } from "timeago.js";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});


  useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`https://mernsns-backend-0404-01.onrender.com/api/users/${post.userId}`);
             setUser(res.data);
      };
         fetchUser();
   }, [post.userId]);



// export default function Post({ post }) {
  // console.log(post);
  // const user = Users.filter((user) => user.id === 1);
  // console.log(user[0].username);
  // const [like, setLike] = useState(post.likes?.length?? 0);
  // const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  // const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // const res = await axios.get(`/users/${post.userId}`);
  //     // const res = await axios.get(`/users/${post.userId}`);
  //     const res = await axios.get(`/users?userId=${post.userId}`);
  //     setUser(res.data);
  //     // console.log(res.data);
  //   };
  //   fetchUser();
  // }, [post.userId]);



  const handleLike = async () => {
    try {
      //いいねのAPIを叩く
      await axios.put(`https://mernsns-backend-0404-01.onrender.com/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };



  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
           <Link to={`profile/${user.username}`} style={{ textDecoration: "none", color: "black" }}>
              <img src={PUBLIC_FOLDER + user.profilePicture ||  PUBLIC_FOLDER + "person/noAvatar.png"} alt=""  className="postProfileImg" />
              <span className="postUsername" >{user.username}</span>
              {/* <span className="postDate" >{format(post.createdAt)}</span> */}
          </Link>
         </div>
        <div className="postTopRight">
             <MoreVert />
        </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
           <div className="postBottomLeft">
             <img className="likeIcon" 
                  alt="" 
                  src={PUBLIC_FOLDER + "/heart.png"} 
                  onClick={() => handleLike()}
             />
             <span className="postLikeCounter"> {like}人がいいねを押しました</span>
           </div>
           <div className="postBottomRight">
              <span className="postCommentText">{post.comment}:コメント</span>
           </div>
        </div>
      </div>
    </div>
    

    //       <div className="postTopLeft">
    //         <Link to={`profile/${user.username}`}>
    //           <img
    //             src={
    //               user.profilePicture
    //                 ? PUBLIC_FOLDER + user.profilePicture
    //                 : PUBLIC_FOLDER + "person/noAvatar.png"
    //             }
    //             alt=""
    //             className="postProfileImg"
    //           />
    //         </Link>
    //         <span className="postUsername">{user.username}</span>
    //         {/* <span className="postDate">{format(post.createdAt)}</span> */}
    //       </div>
    //       <div className="postTopRight">
    //         <MoreVert />
    //       </div>
    //     </div>
    //     <div className="postCenter">
    //       <span className="postText">{post.desc}</span>
    //       <img className="postImg" src={PUBLIC_FOLDER + post.img} alt="" />
    //     </div>
    //     <div className="postBottom">
    //       <div className="postBottomLeft">
    //         <img
    //           className="likeIcon"
    //           src={PUBLIC_FOLDER + "/heart.png"}
    //           alt=""
    //           onClick={() => handleLike()}
    //         />
    //         <span className="postLikeCounter">
    //           {like}人がいいねを押しました
    //         </span>
    //       </div>
    //       <div className="postBottomRight">
    //         <span className="postCommentText">{post.comment}:コメント</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );

  // return (
  //   <div className="post">
  //     <div className="postWrapper">
  //       <div className="postTop">
  //         <div className="postTopLeft">
  //           <Link to={`profile/${user.username}`}>
  //             <img
  //               src={
  //                 user.profilePicture
  //                   ? PUBLIC_FOLDER + user.profilePicture
  //                   : PUBLIC_FOLDER + "person/noAvatar.png"
  //               }
  //               alt=""
  //               className="postProfileImg"
  //             />
  //           </Link>
  //           <span className="postUsername">{user.username}</span>
  //           {/* <span className="postDate">{format(post.createdAt)}</span> */}
  //         </div>
  //         <div className="postTopRight">
  //           <MoreVert />
  //         </div>
  //       </div>
  //       <div className="postCenter">
  //         <span className="postText">{post.desc}</span>
  //         <img className="postImg" src={PUBLIC_FOLDER + post.img} alt="" />
  //       </div>
  //       <div className="postBottom">
  //         <div className="postBottomLeft">
  //           <img
  //             className="likeIcon"
  //             src={PUBLIC_FOLDER + "/heart.png"}
  //             alt=""
  //             onClick={() => handleLike()}
  //           />
  //           <span className="postLikeCounter">
  //             {like}人がいいねを押しました
  //           </span>
  //         </div>
  //         <div className="postBottomRight">
  //           <span className="postCommentText">{post.comment}:コメント</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}