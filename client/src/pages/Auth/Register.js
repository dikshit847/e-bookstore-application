import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import {FaUserAlt} from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

        // Validate the form
        const validationErrors = {};
        if (name.trim() === "") {
          validationErrors.name = " name is required";
        }
        if (email.trim() === "") {
          validationErrors.email = "email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          validationErrors.email = "email is invalid";
        }
        if (phone.trim() === "") {
          validationErrors.phone = " phone no is required";
        } else if (phone.length < 10 || phone.length > 10)
          validationErrors.phone = " phone no should be 10digits";
        if (password.trim() === "") {
          validationErrors.password = " password is required";
        } else if (password.length < 8) {
          validationErrors.password = "password must be at least 8 characters long";
        } else if (!/\d/.test(password)) {
          validationErrors.password = "password must contain a number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          validationErrors.password = "password must contain a special character";
        } else if(password !== confirmpassword){
          validationErrors.confirmpassword = "password do not match";
        }
        if (confirmpassword.trim() === "") {
          validationErrors.confirmpassword = " confirm your password";
        }
        if (address.trim() === "") {
          validationErrors.address = " address is required";
        }
        if (answer.trim() === "") {
          validationErrors.answer = " answer is required";
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
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
    <Layout title="Book store-Register">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title"><FaUserAlt/> REGISTER FORM</h4>
          <div className="mb-3"><b>Name</b><sup>*</sup>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your name"
              autoFocus
            />
            {errors.name && (
              <span className="validationerror">{errors.name} </span>
            )}
          </div>
          <div className="mb-3"><b>Email</b><sup>*</sup>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter Your email "
              
            />
            {errors.email && (
              <span className="validationerror">{errors.email}</span>
            )}
          </div>
          <div className="mb-3"><b>Password</b><sup>*</sup>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="enter your password"
              
            />
            {errors.password && (
              <span className="validationerror">{errors.password}</span>
            )}
          </div>
          <div className="mb-3"><b>Confirm Password</b><sup>*</sup>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="re-enter your password"
              
            />
            {errors.confirmpassword && (
              <span className="validationerror">{errors.confirmpassword}</span>
            )}
          </div>
          <div className="mb-3"><b>Phone</b><sup>*</sup>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your phone no."
              
            />
            {errors.phone && (
              <span className="validationerror">{errors.phone}</span>
            )}
          </div>
          <div className="mb-3"><b>Address</b><sup>*</sup>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your address"
              
            />
            {errors.address && (
              <span className="validationerror">{errors.address}</span>
            )}
          </div>
          <div className="mb-3"><b>Answer</b><sup>*</sup> 
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="what is your favorite sports ?"
            />
              {errors.answer && (
                <span className="validationerror">{errors.answer} </span>
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <div className="login-link"><a href="/login"> Existing user? Login</a></div>
        </form>

      </div>
    </Layout>
  );
};

export default Register;
