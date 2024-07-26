import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Button.css";

function Button({ children, className, onClick, link, disabled, style }) {
  if (link) {
    return (
      <Link to={link} className={`custom-link ${className}`}>
        <button
          className={className}
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "#ddd" : "#007bff",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`custom-button ${className}`}
        onClick={onClick}
        disabled={disabled}
        style={{
          backgroundColor: disabled ? "#ddd" : "#007bff",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {children}
      </button>
    );
  }
}

export default Button;
