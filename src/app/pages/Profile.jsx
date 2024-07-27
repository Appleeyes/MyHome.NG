import React, { useState } from "react";
import axios from "axios";
import "../assets/css/Profile.css";
import UserAct from "../assets/images/user-activity.svg";
import ProfileWoman from "../assets/images/profile-woman.png";
import ArrowBack from "../components/ArrowBackComponent";
import ArrowRight from "../assets/images/arrow-right.svg";
import Footer from "../components/Footer";

function Profile() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://myhome-ng-backend.onrender.com/api/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-container flex-layout">
        <div className="profile-header">
          <ArrowBack />
          <p>Profile</p>
        </div>
        <div className="profile">
          <div className="profile-info">
            <img src={ProfileWoman} alt="Profile Woman" />
          </div>
          <div className="profile-view">
            <h3>Personal Info</h3>
            <div className="display-view">
              <h5>Full Name</h5>
              <p>Fade James</p>
            </div>
            <div className="display-view">
              <h5>Phone Number</h5>
              <p>090 XXX XXX XX</p>
            </div>
            <div className="display-view">
              <h5>Email Address</h5>
              <p>fadejames@gmail.com</p>
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
          <div className="activity">
            <img src={UserAct} alt="User Activity Icon" />
            <div className="">
              <h5>My Activity</h5>
              <div className="activity-down">
                <p>View your recent property searches and activities</p>
                <a href="/user/profile/#">
                  <img src={ArrowRight} alt="Arrow Right Icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="actions-container">
          <div className="action-item">
            <p>Complete Your Profile</p>
            <a href="/#">
              <img src={ArrowRight} alt="Arrow Right Icon" />
            </a>
          </div>
          <div className="action-item">
            <p>Check Your Eligibility Status</p>
            <a href="/#">
              <img src={ArrowRight} alt="Arrow Right Icon" />
            </a>
          </div>
          <div className="action-item">
            <p>Upload Document</p>
            <a href="/#">
              <img src={ArrowRight} alt="Arrow Right Icon" />
            </a>
          </div>
          <div className="action-item">
            <p>Verification</p>
            <a href="/#">
              <img src={ArrowRight} alt="Arrow Right Icon" />
            </a>
          </div>
          <div
            className="action-item"
            onClick={handleLogout}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            <p>{loading ? "Logging out..." : "Logout"}</p>
            {loading ? (
              <div
                className="spinner"
                style={{ width: "20px", height: "20px" }}
              ></div>
            ) : (
              <a href="/#">
                <img src={ArrowRight} alt="Arrow Right Icon" />
              </a>
            )}
          </div>
        </div>
        <Footer currentRoute={window.location.pathname} />
      </div>
    </div>
  );
}

export default Profile;
