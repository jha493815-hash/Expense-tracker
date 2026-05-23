import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-viewport">
      <div className="notfound-card">
        {/* Animated Visual Icon */}
        <div className="notfound-icon-wrapper">
          <div className="notfound-icon">🔍</div>
        </div>

        <h1>Account Not Found</h1>
        <p className="notfound-message">
          We couldn't find an active account matching those credentials in our database. 
          You might need to create a new profile to access the Hubio workspace.
        </p>

        {/* Navigation Action Buttons */}
        <div className="notfound-actions-stack">
          <button 
            className="btn-register-primary"
            onClick={() => navigate('/register')}
          >
            ✨ Create New Account
          </button>
          
          <button 
            className="btn-login-secondary"
            onClick={() => navigate('/login')}
          >
            ⬅️ Back to Login
          </button>
        </div>

        {/* Footer Question Link */}
        <div className="notfound-footer">
          <span>First time using Hubio?</span>
          <button onClick={() => navigate('/register')} className="inline-link-btn">
            Register your profile now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;