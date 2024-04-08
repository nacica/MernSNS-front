// import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import "./Rightbar.css";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);

  // const { user: currentUser, dispatch } = useContext(AuthContext);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user?.id]);

  const handleClick = async () => {
    try {
      if (followed) {
        // console.log("ユーザーがundefinedかどうか調べるよ");
        // console.log(user);
        await axios.put(`https://mernsns-backend-0404-01.onrender.com/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`https://mernsns-backend-0404-01.onrender.com/api/users/${user._id}/follow`);
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/star.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.jpeg" alt="" />
        <h4 className="rightbarTitle">オンラインの友達</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
        <p className="promotionTitle">プロモーション広告</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion1.jpeg"
          alt=""
        />
        <p className="promotionName">ショッピング</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion2.jpeg"
          alt=""
        />
        <p className="promotionName">カーショップ</p>
        <img
          className="rightbarPromotionImg"
          src="assets/promotion/promotion3.jpeg"
          alt=""
        />
        <p className="promotionName">ShinCode株式会社</p>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
         {/* フォロー機能時に追加 */}
         {user.username !== currentUser.username && (
          <button 
            className="rightbarFollowButton"
            onClick={() => handleClick()}
           > 
             {followed ? "フォローを外す" : "フォロー"}
             {/* {followed ? <Remove /> : <Add />} */}
             {/* フォロー <Add /> */}
           </button> 
        )} 
        <h4 className="rightbarTitle">ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身:</span>
            <span className="rightbarInfoKey">{user.city}</span>
          </div>
          <h4 className="rightbarTitle">オンライン中の友達</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/kubo.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">久保建英</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/nagatomo.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">長友佑都</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/tomiyasu.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">冨安健洋</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/maeda.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">前田大然</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/endou.png"}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">遠藤航</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}