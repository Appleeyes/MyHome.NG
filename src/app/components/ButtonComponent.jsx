import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Button.css";

function Button({ children, className, onClick, link }) {
  if (link) {
    return (
      <Link to={link} className={`custom-link ${className}`}>
        <button className={className}>{children}</button>
      </Link>
    );
  } else {
    return (
      <button className={`custom-button ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
