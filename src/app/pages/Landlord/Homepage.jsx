import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/css/LandlordHomepage.css';
import BellIcon from '../../assets/images/bell.svg';
import ChatIcon from "../../assets/images/chat-icon.svg";
import Receipt from '../../assets/images/reciept.svg';
import PropertyManagement from '../../assets/images/home1.png';
import TenantManagement from '../../assets/images/activity2.svg';
import Performance from '../../assets/images/activity3.png';
import SearchComponent from '../../components/SearchComponent';
import Footer from '../../components/Footer';

function Homepage() {
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
      <div className="landlord-homepage">
        <div className="landlord-head">
          <div className="landlord-info">
            <a href="/profile">
              <img src={userDetails.image} alt="Profile Imge" />
            </a>
            <h3>Hello {userDetails.name},</h3>
          </div>
          <a href="/notification">
            <img src={BellIcon} alt="Bell Icon" />
          </a>
        </div>
        <SearchComponent />
        <div className="main-actions">
          <a href="/payment/generate">
            <img src={Receipt} alt="Receipt Icon" />
            <p>Receipt Generation</p>
          </a>
          <a href="/landlord/performance">
            <img src={Performance} alt="Performance Icon" />
            <p>Performance and reviews</p>
          </a>
          <a href="/product/management">
            <img src={PropertyManagement} alt="Management Icon" />
            <p>Property Management</p>
          </a>
          <a href="/user/management">
            <img src={TenantManagement} alt="Management Icon" />
            <p>Tenant Management</p>
          </a>
          <a href="/chats">
            <img src={ChatIcon} alt="Chat Icon" />
            <p>Chats</p>
          </a>
          {/* <a href="/product/management" className="activity-item">
            <img src={Activity4} alt="Activity Icon" />
            <p>Premium Listing</p>
          </a> */}
        </div>
        <Footer currentRoute={window.location.pathname} />
      </div>
    );
}

export default Homepage;
