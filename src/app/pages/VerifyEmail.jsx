import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import VerificationComponent from "../components/VerificationComponent";

function VerifyEmail() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserEmail = localStorage.getItem("userEmail");

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
  }, []);

  const verifyEmail = async (verificationCode) => {
    setIsVerifying(true);
    if (!userId) {
      setError("User ID not found");
      setIsVerifying(false);
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
      history.push("/account-success");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerificationEmail = async (e) => {
    e.preventDefault();
    setIsResending(true);
    if (!userId) {
      setError("User ID not found");
      setIsResending(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://myhome-ng-backend.onrender.com/api/v1/${userId}/send-verification-email`
      );
      setMessage(response.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsResending(false);
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
        action={verifyEmail}
        resendAction={resendVerificationEmail}
        isVerifying={isVerifying}
        isResending={isResending}
      />
    </div>
  );
}

export default VerifyEmail;
