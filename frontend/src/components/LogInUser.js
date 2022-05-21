import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../css/LogIn.css";
import { Link } from "react-router-dom";
import Error from "./Error";

const API = process.env.REACT_APP_API_URL;

function LogInUser({ setLogText }) {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    password: "",
  });
  //show error to user
  const [error, setError] = useState("");

  const logIn = () => {
    setError("");
    axios
      .post(`${API}/auth/login`, user)
      .then((res) => {
        const userId = res.data.result;
        if (!isNaN(userId)) {
          setError("");
          localStorage.setItem("userId", `${userId}`);
          setLogText("Log Out");
          navigate(`/users/${userId}`);
        }
      })
      .catch((c) => {
        if (c.response && c.response.data) {
          setError(c.response.data.error);
        }
      });
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn();
  };

  return (
    <div>
      {error ? <Error error={error} /> : ""}
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label class="login" for="username">
          Username
        </label>
        <input
          type="text"
          placeholder="Username"
          id="user_name"
          onChange={handleChange}
          value={user.user_name}
        />

        <label class="login" for="password">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          value={user.password}
        />

        <button>Log In</button>
        <Link to="/users/create">
          <button>New to EDUK? Sign up here!</button>
        </Link>
      </form>
    </div>
  );
}
export default LogInUser;
