import axios from "axios";

export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("https://mernsns-backend-0404-01.onrender.com/api/auth/login", user);
    // const res = await axios.post(process.env.REACT_APP_LOGIN_API, user);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};