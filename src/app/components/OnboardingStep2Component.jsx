import React from 'react';
import "../assets/css/OnboardingSteps.css";
import Button from "../components/ButtonComponent";

function OnboardingStep2() {
  return (
    <div className='onboard2'>
      <div className="background-image"></div>
      <div className="text-container">
        <h5>Get Loans</h5>
        <p>Get loans for your accoundation</p>
        <Button link="#">Next</Button>
      </div>
    </div>
  );
}

export default OnboardingStep2;
