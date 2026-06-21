import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";
import { useUser as useUserContext } from "../../context/userContext.jsx";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const { setRefresh } = useUserContext();
  const navigate = useNavigate();

  // Handle Inputs
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image");
    }

    setUser((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setUser((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password || !user.phone) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        if (user[key]) formData.append(key, user[key]);
      });

      const res = await axios.post(`${API}/register`, formData);

      if (res.data?.success) {
        toast.success("Registered successfully 🎉");
        localStorage.setItem("phone", user.phone);
        setRefresh((prev) => !prev);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
        />

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

        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
        />

        <label className="upload-box">
          Upload Image
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>

        {preview && (
          <div className="preview-box">
            <button type="button" onClick={handleRemoveImage}>
              ×
            </button>
            <img src={preview} alt="preview" />
          </div>
        )}

        <button className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;