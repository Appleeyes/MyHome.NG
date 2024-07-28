import React from "react";
import ArrowBack from "../components/ArrowBackComponent";
import useVerificationHook from "react-code-hook";
import "../assets/css/VerificationComponent.css";

function VerificationComponent({
  verifying,
  destination,
  contact,
  action,
  resendAction,
  isVerifying,
  isResending,
}) {
  const { inputStates, inputClass, handleChange, handleKeyDown } =
    useVerificationHook(4);

  return (
    <div className="verify-container">
      <div className="verify-header">
        <ArrowBack />
      </div>
      <div className="verify-content">
        <h3>Verify {verifying}</h3>
        <p>
          Enter the 4-digit Code we sent to your {destination} at{" "}
          <span>{contact}</span>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isVerifying) {
            action(inputStates.map((state) => state.digit).join(""));
          }
        }}
      >
        <div className="inputs">
          {inputStates.map((state, ii) => (
            <input
              key={ii}
              type="number"
              value={state.digit}
              className={inputClass}
              onChange={(e) => handleChange(e, ii)}
              onKeyDown={handleKeyDown}
              style={{ fontSize: "20px" }}
              disabled={isVerifying || isResending}
            />
          ))}
        </div>
        <p>Didn’t receive the code?</p>
        <a
          href="/nil"
          onClick={(e) => {
            e.preventDefault();
            if (!isResending) {
              resendAction(e);
            }
          }}
          className={isResending ? "disabled-link" : ""}
        >
          {isResending ? "Sending..." : "Resend Code"}
        </a>
        <button
          className={isVerifying ? "disabled-button" : ""}
          disabled={isVerifying || isResending}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}

export default VerificationComponent;
