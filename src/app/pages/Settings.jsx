import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Settings.css";
import ArrowBack from "../components/ArrowBackComponent";
import Notification from "../assets/images/notification.svg";
import Offer from "../assets/images/offer.svg";
import Agreement from "../assets/images/agreement.svg";
import Payment from "../assets/images/pay.svg";
import Terms from "../assets/images/terms.svg";
import Privacy from "../assets/images/privacy.svg";
import Help from "../assets/images/chat-help.svg";
import Logout from "../assets/images/logout.svg";
import EditImage from "../assets/images/edit-image.svg";
import ArrowRight from "../assets/images/arrow-right.svg";
import Footer from "../components/Footer";

function Settings() {
  const [loading, setLoading] = useState(false);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserDetails({ ...userDetails, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="settings">
      <div className="head">
        <ArrowBack />
        <p>Settings</p>
      </div>
      <div className="images">
        <img className="house" src={userDetails.image} alt="Profile House" />
        <div className="profile-pic">
          <label htmlFor="imageUpload" className="image-upload-label">
            <img src={userDetails.image} alt="Profile Woman" />
            <img className="edit-image" src={EditImage} alt="edit image" />
          </label>
          <p>{userDetails.name}</p>
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="options">
        <a href="/notification" className="action-item">
          <div>
            <img src={Notification} alt="Notification Icon" />
            <p>Notification</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/chats" className="action-item">
          <div>
            <img src={Offer} alt="Offer Icon" />
            <p>Offer</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/agreement" className="action-item">
          <div>
            <img src={Agreement} alt="Agreement" />
            <p>Agreement</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/#" className="action-item">
          <div>
            <img src={Payment} alt="Payment Icon" />
            <p>Payment</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/terms-and-condition" className="action-item">
          <div>
            <img src={Terms} alt="Terms Icon" />
            <p>Terms and Condition</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/privacy-policy" className="action-item">
          <div>
            <img src={Privacy} alt="Privacy Icon" />
            <p>Privacy Policy</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <a href="/#" className="action-item">
          <div>
            <img src={Help} alt="Help Icon" />
            <p>Help and Support</p>
          </div>
          <img src={ArrowRight} alt="Arrow Right Icon" />
        </a>
        <div
          className="action-item"
          onClick={handleLogout}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          <div>
            <img src={Logout} alt="Logout Icon" />
            <p>{loading ? "Logging out..." : "Logout"}</p>
          </div>
          {loading ? (
            <div
              className="spinner"
              style={{ width: "20px", height: "20px" }}
            ></div>
          ) : (
            <img src={ArrowRight} alt="Arrow Right Icon" />
          )}
        </div>
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default Settings;
