import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FormComponent from "../../components/FormComponent";
import ArrowBack from "../../components/ArrowBackComponent";
import "../../assets/css/Login.css";
import GoogleAuthButton from "../../components/GoogleAuthComponent";
import FacebookAuthButton from "../../components/FacebookAuthComponent";

function Login() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const fields = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleLogin = async (formData) => {
    const { email, password} = formData
    try{
      const response = await axios.post("https://myhome-ng-backend.onrender.com/api/v1/tenant/login", {
        email,
        password
      })
      setMessage(response.data.message)
      setError(null)

      const token = response.data.data.token;
      localStorage.setItem("token", token);
      history.push("/user/home");
    }catch(err){
      if (err.response) {
        const apiError = err.response.data.data.errors;
        setError(apiError);
      } else {
        setError("An unexpexted error occured");
      }
    }
  }
  return (
    <div className="Login">
      <div className="head">
        <ArrowBack />
        <h1>Log In</h1>
        <p>Welcome back!</p>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}
      </div>
      <FormComponent
        fields={fields}
        submitButtonText="Log In"
        forgotPasswordLink="/login"
        forgotPasswordText="Forget Password"
        additionalTagText="Don’t have an account? "
        additionalTagLink="/user/signup"
        additionalTagLinkText="Create Account"
        onSubmit={handleLogin}
      />

      <div>
        <div className="line">
          <hr />
          <span>Or Log In with email</span>
          <hr />
        </div>
        <div className="authButtons">
          <GoogleAuthButton />
          <FacebookAuthButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
