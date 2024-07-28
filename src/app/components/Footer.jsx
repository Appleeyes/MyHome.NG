import React from "react";
import "../assets/css/Footer.css";
import HomeIcon from "../assets/images/home-icon.svg";
import LoveIcon from "../assets/images/love-icon.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import SettingIcon from "../assets/images/settings-icon.svg";
import ProfileIcon from "../assets/images/profile-icon.svg";
import HomeActive from "../assets/images/home-active.svg";
import LoveActive from "../assets/images/love-active.svg";
import SearchActive from "../assets/images/search-active.svg";
import SettingActive from "../assets/images/settings-active.svg";
import ProfileActive from "../assets/images/profile-active.svg";

function Footer({ currentRoute }) {
  const userRole = localStorage.getItem("userRole");

  const getIcon = (route) => {
    switch (route) {
      case "/user/home":
      case "/landlord/home":
        return currentRoute === route ? HomeActive : HomeIcon;
      case "/product/bookmarked":
      case "/landlord/properties":
        return currentRoute === route ? LoveActive : LoveIcon;
      case "/search":
      case "/landlord/search":
        return currentRoute === route ? SearchActive : SearchIcon;
      case "/settings":
      case "/settings":
        return currentRoute === route ? SettingActive : SettingIcon;
      case "/profile":
      case "/profile":
        return currentRoute === route ? ProfileActive : ProfileIcon;
      default:
        return SettingIcon;
    }
  };

  const getRoute = () => {
    if (userRole === "landlord") {
      return {
        home: "/landlord/home",
        bookmarked: "/landlord/properties",
        search: "/landlord/search",
        settings: "/settings",
        profile: "/profile",
      };
    }
    return {
      home: "/user/home",
      bookmarked: "/product/bookmarked",
      search: "/search",
      settings: "/settings",
      profile: "/profile",
    };
  };

  const routes = getRoute();

  return (
    <div className="footer">
      <ul>
        <li>
          <a
            href={routes.home}
            className={currentRoute === routes.home ? "active" : ""}
          >
            <img src={getIcon(routes.home)} alt="Home Icon" />
          </a>
        </li>
        <li>
          <a
            href={routes.bookmarked}
            className={currentRoute === routes.bookmarked ? "active" : ""}
          >
            <img src={getIcon(routes.bookmarked)} alt="Love Icon" />
          </a>
        </li>
        <li>
          <a
            href={routes.search}
            className={currentRoute === routes.search ? "active" : ""}
          >
            <img src={getIcon(routes.search)} alt="Search Icon" />
          </a>
        </li>
        <li>
          <a
            href={routes.settings}
            className={currentRoute === routes.settings ? "active" : ""}
          >
            <img src={getIcon(routes.settings)} alt="Setting Icon" />
          </a>
        </li>
        <li>
          <a
            href={routes.profile}
            className={currentRoute === routes.profile ? "active" : ""}
          >
            <img src={getIcon(routes.profile)} alt="Profile Icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
