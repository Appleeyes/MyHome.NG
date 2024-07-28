import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Profile.css";
import UserAct from "../assets/images/user-activity.svg";
import ArrowBack from "../components/ArrowBackComponent";
import ArrowRight from "../assets/images/arrow-right.svg";
import Footer from "../components/Footer";

function Profile() {
  const [userDetails, setUserDetails] = useState([]);

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occured");
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-container flex-layout">
        <div className="profile-header">
          <ArrowBack />
          <p>Profile</p>
        </div>
        <div className="profile">
          <div className="profile-info">
            <img src={userDetails.image} alt="Profile" />
          </div>
          <div className="profile-view">
            <h3>Personal Info</h3>
            <div className="display-view">
              <h5>Full Name</h5>
              <p>{userDetails.name}</p>
            </div>
            <div className="display-view">
              <h5>Phone Number</h5>
              <p>{userDetails.phone_number}</p>
            </div>
            <div className="display-view">
              <h5>Email Address</h5>
              <p>{userDetails.email}</p>
            </div>
            <div className="display-view">
              <h5>Change Password</h5>
              <p>
                <a href="/settings">
                  <img src={ArrowRight} alt="Arrow Right Icon" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="additional-content">
          <a href="/#" className="activity">
            <img src={UserAct} alt="User Activity Icon" />
            <div className="">
              <h5>My Activity</h5>
              <div className="activity-down">
                <p>View your recent property searches and activities</p>
                <img src={ArrowRight} alt="Arrow Right Icon" />
              </div>
            </div>
          </a>
        </div>
        <div className="actions-container">
          <a href="/#" className="action-item">
            <p>Complete Your Profile</p>
            <img src={ArrowRight} alt="Arrow Right Icon" />
          </a>
          <a href="/#" className="action-item">
            <p>Check Your Eligibility Status</p>
            <img src={ArrowRight} alt="Arrow Right Icon" />
          </a>
          <a href="/#" className="action-item">
            <p>Upload Document</p>
            <img src={ArrowRight} alt="Arrow Right Icon" />
          </a>
          <a href="/#" className="action-item">
            <p>Verification</p>
            <img src={ArrowRight} alt="Arrow Right Icon" />
          </a>
        </div>
        <Footer currentRoute={window.location.pathname} />
      </div>
    </div>
  );
}

export default Profile;
