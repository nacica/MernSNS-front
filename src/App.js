import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
// import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Post from "./components/post/Post";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> } />
        {/* <Route path="/" element={user ? <Home /> : <Login />} /> */}
        {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;