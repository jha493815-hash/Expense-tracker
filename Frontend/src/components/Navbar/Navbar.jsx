import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Check authentication flags dynamically
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isAuthenticated = !!token || role === "admin";

  // 2. FIXED: Safely grab and parse user data without crashing if it's missing/undefined
  const userString = localStorage.getItem("user");
  const user = userString && userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <header className="navbar-header">
      {/* Left side brand/context title */}
      <div className="navbar-brand-context">
        <h3>Hubio Workspace</h3>
      </div>

      {/* Right side contextual action block */}
      <div className="navbar-actions-wrapper">
        {isAuthenticated ? (
          /* DISPLAY USER PROFILE INFO IF LOGGED IN */
          <div className="navbar-user-profile">
            <span className="user-welcome-text">
              Hello, <strong>{user?.name || "User"}</strong>
            </span>
            <div className="avatar-circle">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
        ) : (
          /* DISPLAY AUTH GATE BUTTONS IF LOGGED OUT */
          <div className="navbar-auth-pills">
            {location.pathname !== "/login" && (
              <button 
                type="button" 
                className="btn-nav-login" 
                onClick={() => navigate("/login")}
              >
                <FaSignInAlt className="nav-btn-icon" />
                <span>Sign In</span>
              </button>
            )}

            {location.pathname !== "/register" && (
              <button 
                type="button" 
                className="btn-nav-register" 
                onClick={() => navigate("/register")}
              >
                <FaUserPlus className="nav-btn-icon" />
                <span>Get Started</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;