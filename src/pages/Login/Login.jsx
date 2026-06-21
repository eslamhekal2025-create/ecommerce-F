import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import { setUserRedux } from "../../Redux/user.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // Handle Input
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/login`, user);

      if (res.data?.success) {
        const { token, user: dataUser } = res.data;

        // Save data
        localStorage.setItem("token", token);
        localStorage.setItem("userId", dataUser.id);
        localStorage.setItem("user", JSON.stringify(dataUser));

        // Redux
        dispatch(setUserRedux(dataUser));

        toast.success("Welcome back 👋");

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;