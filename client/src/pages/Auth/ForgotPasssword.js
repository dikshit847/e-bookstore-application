import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

        // Validate the form
        const validationErrors = {};
        if (email.trim() === "") {
          validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          validationErrors.email = "Email is invalid";
        }
        if (newPassword.trim() === "") {
          validationErrors.newPassword = " Password is required";
        } else if (newPassword.length < 8) {
          validationErrors.newPassword = "Password must be at least 8 characters long";
        } else if (!/\d/.test(newPassword)) {
          validationErrors.newPassword = "Password must contain a number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
          validationErrors.newPassword = "Password must contain a special character";
        }
        if (answer.trim() === "") {
          validationErrors.answer = " answer is required";
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3"><b>Email :</b>
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
          <div className="mb-3"><b>Answer :</b>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your favorite sport name "
            />
            {errors.answer && (
              <span className="validationerror">{errors.answer}</span>
            )}
          </div>
          <div className="mb-3"><b>Set Password :</b>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your new password"
            />
            {errors.newPassword && (
              <span className="validationerror">{errors.newPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
          <div><a href="/login">Back to login</a></div>
          
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
