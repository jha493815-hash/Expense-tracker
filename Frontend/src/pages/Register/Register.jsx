import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialBudget, setInitialBudget] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    // 1. Strict client-side validation to ensure no blank strings are sent
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail || !cleanName || !password) {
      setErrorMsg("All registration fields must be filled out correctly.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: cleanName,
          email: cleanEmail,
          password: password,
          totalBalance: Number(initialBudget) || 0,
        }
      );

      console.log("Server Response:", response.data);

      setSuccessMsg("Registration successful! Redirecting to login...");

      localStorage.setItem(`budget_${cleanEmail}`, initialBudget || "0");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Axios Error Object:", error);
      
      // Captures the message sent back from backend or defaults to network error
      setErrorMsg(
        error.response?.data?.message || 
        error.message || 
        "Something went wrong during registration."
      );
    }
  };

  return (
    <div className="auth-viewport">
      <div className="register-card-box">
        
        {/* HEADER */}
        <div className="register-brand">
          <h2>FinSense</h2>
          <p>Create your dashboard account and set your targets.</p>
        </div>

        {/* ALERTS */}
        {errorMsg && (
          <div className="auth-error-bubble">
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="auth-success-bubble">
            ✨ {successMsg}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="auth-form-stack">
          
          {/* NAME */}
          <div className="auth-field-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Aman Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="auth-field-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field-group">
            <label>Secure Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* BUDGET */}
          <div className="auth-field-group">
            <label>Monthly Budget Target ($)</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={initialBudget}
              onChange={(e) => setInitialBudget(e.target.value)}
              required
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="btn-auth-submit">
            Create Account & Initialize
          </button>
        </form>

        {/* FOOTER */}
        <div className="register-footer">
          <span>Already have an account?</span>
          <button
            onClick={() => navigate("/login")}
            className="inline-link-btn"
          >
            Sign In instead
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;