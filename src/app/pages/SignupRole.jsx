import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/OnboardingSteps.css";
import Button from "../components/ButtonComponent";

function SignupRole() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLandlordSubmitting, setIsLandlordSubmitting] = useState(false);
  const [isTenantSubmitting, setIsTenantSubmitting] = useState(false);
  const history = useHistory();

  const setRole = (role) => {
    if (role === "landlord") {
      setIsLandlordSubmitting(true);
    } else if (role === "tenant") {
      setIsTenantSubmitting(true);
    }

    try {
      localStorage.setItem("role", role);
      setMessage("Role set successfully.");
      setError(null);
      if (role === "landlord") {
        history.push("/landlord/access");
      } else if (role === "tenant") {
        history.push("/tenant/access");
      }
    } catch (err) {
      console.error("Error setting role:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLandlordSubmitting(false);
      setIsTenantSubmitting(false);
    }
  };

  return (
    <div className="signup-role">
      <div className="background-image">
        <div className="text-container">
          {error && <div className="error">{error}</div>}
          {message && <div className="message">{message}</div>}
          <h5>Are you</h5>
          <Button
            onClick={() => setRole("landlord")}
            disabled={isLandlordSubmitting || isTenantSubmitting}
          >
            {isLandlordSubmitting ? "Submitting..." : "Landlord"}
          </Button>
          <Button
            onClick={() => setRole("tenant")}
            disabled={isTenantSubmitting || isLandlordSubmitting}
          >
            {isTenantSubmitting ? "Submitting..." : "Tenant"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignupRole;
