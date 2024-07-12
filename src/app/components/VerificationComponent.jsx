import ArrowBack from '../components/ArrowBackComponent';
import '../assets/css/VerificationComponent.css';
import React from 'react';
import useVerificationHook from "react-code-hook"

function VerificationComponent({ verifying, destination, contact, action, arrowBack, link, }) {
    const { inputStates, inputClass, handleChange, handleKeyDown } =
        useVerificationHook(4);

    return (
        <div className='verify-container'>
            <div className='verify-header'>
                <ArrowBack />
            </div>
            <div className='verify-content'>
                <h3>Verify {verifying}</h3>
                <p>Enter the 4-digit Code we sent to your {destination} at <span>{contact}</span></p>
            </div>
            <form onSubmit={(e => {e.preventDefault(); action(inputStates.map((state) => state.digit).join(""));})}>
                <div className="inputs">
                    {inputStates.map((state, ii) => {
                        return (
                            <input
                                key={ii}
                                type="number"
                                value={state.digit}
                                className={inputClass}
                                onChange={(e) => handleChange(e, ii)}
                                onKeyDown={handleKeyDown}
                                style={{ fontSize: '20px' }}
                            />
                        );
                    })}
                </div>
                <p>Didn’t receive the code?</p>
                <a href={link}>Resend Code</a>
                <button>Verify</button>
            </form>
        </div>
    )
}

export default VerificationComponent;
