import React, { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";
//AuthContextはユーザー状態が入ってる(user, isFetching, error, dispatch)
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();


  // eslint-disable-next-line
  const { user, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user); //ユーザーがログインしてる状態
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleClick(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <p className="loginMsg idpass">Eメール 　:　a@gmail.com</p>
            <p className="loginMsg idpass">パスワード　:　123456</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              required
              minLength="6"
              placeholder="パスワード"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>

          </form>
          <button 
             className="loginRegisterButton"
             onClick={() => window.location.href = "https://zero404-mernsns-front01.onrender.com/register"}>
             {/* onClick={() => window.location.href = "http://localhost:3000/register"}> */}
              アカウント作成
          </button>
        </div>
      </div>
    </div>
  );
}