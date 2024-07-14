import React from 'react';
import "../../assets/css/OnboardingSteps.css";
import Button from "../../components/ButtonComponent";

function Access() {
  return (
    <div className='access'>
      <div className="background-image">
        <div className="text-container">
          <Button link="/signup">Sign Up</Button>
          <Button link="/login">Log In</Button>
        </div>
      </div>

    </div>
  );
}

export default Access;
