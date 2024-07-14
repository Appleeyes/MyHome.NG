import VerificationComponent from '../components/VerificationComponent';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function VerifyEmail() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId')
        const storedUserEmail = localStorage.getItem('userEmail')

        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          setError("User ID not found");
        }

        if (storedUserEmail) {
          setUserEmail(storedUserEmail);
        } else {
          setError("User Email not found");
        }
    }, [])

    const verifyEmail = async (verificationCode) => {
      if (!userId) {
        setError("User ID not found");
        return;
      }

      try {
        const response = await axios.post(
          "https://myhome-ng-backend.onrender.com/api/v1/verify-email",
          {
            user_id: userId,
            verification_code: verificationCode,
          }
        );
        setMessage(response.data.message);
        history.push("/user/account-success");
      } catch (err) {
        if (err.response) {
          const apiError = err.response.data.message;
          setError(apiError);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    return (
      <div className="verify-email">
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}
        <VerificationComponent
          verifying="Email"
          destination="email"
          contact={userEmail}
          action={(verificationCode) => verifyEmail(verificationCode)}
          link="/user/verify-email"
        />
      </div>
    );
}

export default VerifyEmail;
