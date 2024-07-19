import React from 'react';
import '../../assets/css/LandlordHomepage.css';
import ProfileWoman from '../../assets/images/profile-woman.png';
import BellIcon from '../../assets/images/bell.svg';
import ChatIcon from "../../assets/images/chat-icon.svg";
import Receipt from '../../assets/images/reciept.svg';
import PropertyManagement from '../../assets/images/home1.png';
import TenantManagement from '../../assets/images/activity2.svg';
import Performance from '../../assets/images/activity3.png';
import SearchComponent from '../../components/SearchComponent';
import Footer from '../../components/Footer';

function Homepage() {
    return (
      <div className="landlord-homepage">
        <div className="landlord-head">
          <div className="landlord-info">
            <a href="/landlord/profile">
              <img src={ProfileWoman} alt="Profile Imge" />
            </a>
            <h3>Hello Fade,</h3>
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
        </div>
        <Footer currentRoute={window.location.pathname} />
      </div>
    );
}

export default Homepage;
