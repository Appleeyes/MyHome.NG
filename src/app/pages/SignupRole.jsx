import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "../assets/css/OnboardingSteps.css";
import Button from "../components/ButtonComponent";

function SignupRole() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()

  const setRole = async (role) => {
    try{
      const response = await axios.post("https://myhome-ng-backend.onrender.com/api/v1/set-role", {
        role
      })
      const userId = response.data.user_id
      if (!userId) {
        throw new Error("User ID is missing in the response");
      }

      localStorage.setItem('userId', userId)
      localStorage.setItem("role", role);
      setMessage(response.data.message);
      setError(null);
      if(role === 'landlord'){
        history.push("/landlord/access");
      }else if(role === 'tenant'){
        history.push("/tenant/access");
      }
    } catch(err){
      console.error("Error setting role:", err);
      if (err.response) {
        const apiError = err.response.data.error;
        setError(apiError);
      } else {
        setError("An unexpexted error occured");
      }
    }
  }
  return (
    <div className="signup-role">
      <div className="background-image">
        <div className="text-container">
          {error && <div className="error">{error}</div>}
          {message && <div className="message">{message}</div>}
          <h5>Are you</h5>
          <Button onClick={() => setRole("landlord")}>Land Lord</Button>
          <Button onClick={() => setRole("tenant")}>Tenant</Button>
        </div>
      </div>
    </div>
  );
}

export default SignupRole;
