import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from "../../components/CustomModal";
import FormComponent from "../../components/FormComponent";
import ArrowBack from "../../components/ArrowBackComponent";
import CheckIcon from "../../assets/images/check-icon.svg";
import "../../assets/css/SignUp.css";
import GoogleAuthButton from "../../components/GoogleAuthComponent";
import FacebookAuthButton from "../../components/FacebookAuthComponent";
import TermsAndConditions from "../../components/TermsAndConditionsComponent";

function SignUp() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const history = useHistory();

  const fields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "number" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  const handleSignUp = async (formData) => {
    const { fullName, phoneNumber, email, password, confirmPassword } =
      formData;
    try {
      const response = await axios.post(
        "https://myhome-ng-backend.onrender.com/api/v1/tenant/register",
        {
          name: fullName,
          email,
          phone_number: phoneNumber,
          password,
          password_confirmation: confirmPassword,
        }
      );
      setMessage(response.data.message);
      setUserId(response.data.data.tenant.id);
      localStorage.setItem("userId", response.data.data.tenant.id);
      localStorage.setItem("userEmail", response.data.data.tenant.email);
      setShowModal(true);
      setError(null);
    } catch (err) {
      if (err.response) {
        const apiError = err.response.data.data.errors;
        setError(apiError);
      } else {
        setError("An unexpexted error occured");
      }
    }
  };

  const sendVerificationEmail = async (e) => {
    e.preventDefault()
    if (!userId){
      setError("User ID not found")
      return
    }
    try {
      const response = await axios.post(`https://myhome-ng-backend.onrender.com/api/v1/${userId}/send-verification-email`)
      setMessage(response.data.message)
      history.push("/user/verify-email");
    } catch(err){
      if (err.response) {
        const apiError = err.response.data.message;
        setError(apiError);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  return (
    <div className="SignUp">
      <div className="head">
        <ArrowBack />
        <h1>Create Account</h1>
        {error && <div className="error">{error}</div>}
      </div>

      <FormComponent
        fields={fields}
        submitButtonText="Create Account"
        onSubmit={handleSignUp}
        additionalTagText="Already have an Account? "
        additionalTagLink="/landlord/login"
        additionalTagLinkText="Log In"
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {message && <div className="message">{message}</div>}
          <div className="modal-cont">
            <img src={CheckIcon} alt="Check Icon" />
            <p>Verify Your Email</p>
          </div>
          <div className="buttons">
            <a className="link" href="/user/verify-email" onClick={sendVerificationEmail}>
              Verify
            </a>
            <a className="link" href="/user/account-success">
              Skip
            </a>
          </div>
        </Modal>
      )}

      <div>
        <div className="line">
          <hr />
          <span>Or create account with email</span>
          <hr />
        </div>
        <div className="authButtons">
          <GoogleAuthButton />
          <FacebookAuthButton />
        </div>
        <div className="terms">
          <TermsAndConditions />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
