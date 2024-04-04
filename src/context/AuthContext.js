// import { createContext, useReducer } from "react";
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

//最初のユーザー状態の定義
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, //ローカルストレージにログイン状態を見に行く。投稿後に自動ログアウトするのを防げる
  // user: {
  //   _id: "65b8bc11f93dc9ed2d514a65",
  //   username: "遠藤航",
  //   email: "yokohama0232009@yahoo.co.jp",
  //   password: "0232009",
  //   profilePicture: "/person/endou.png",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   likes: [],
  //   isAdmin: false,
  // },
  // user: {
  //   _id: "65b89a4e11ec94fc24c0d694",
  //   username: "南野拓実",
  //   email: "yokohama0232009@yahoo.co.jp",
  //   password: "0232009",
  //   profilePicture: "/person/minamino.png",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   likes: [],
  //   isAdmin: false,
  // },
  // user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false, //ログインしようともしてないですね。
  error: false, //エラーも吐いてないですね。
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  //ユーザー入力によって状態(state)が更新され、それをグローバルに利用している。
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // set user data in localstroge
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};