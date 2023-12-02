import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { FaUserAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (email.trim() === "") {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "email is invalid";
    }
    if (password.trim() === "") {
      validationErrors.password = " password is required";
    } else if (password.length < 8) {
      validationErrors.password = "password must be at least 8 characters long";
    } else if (!/\d/.test(password)) {
      validationErrors.password = "password must contain a number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      validationErrors.password = "password must contain a special character";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title="Book store-Login">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">
            <FaUserAlt />
            LOGIN FORM
          </h4>

          <div className="mb-3">
            <div className="form-title">
              <b>Email :</b>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your email "
            />
            {errors.email && (
              <span className="validationerror">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <div className="form-title">
              <b>Password :</b>
            </div>
            <div className="flex justify-between items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
            <div id="eye" onClick={handleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            </div>
            {errors.password && (
              <span className="validationerror">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mb-3" id="forgot-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <a href="/register">New user?Sign Up</a>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
