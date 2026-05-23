import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ADMIN LOGIN
    if (role === "admin") {
      const MASTER_ADMIN_EMAIL =
        "MusicXparkadmin@240695";

      const MASTER_ADMIN_PASSWORD =
        "2006";

      if (
        email.trim() ===
          MASTER_ADMIN_EMAIL &&
        password ===
          MASTER_ADMIN_PASSWORD
      ) {
        localStorage.setItem(
          "role",
          "admin"
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: MASTER_ADMIN_EMAIL,
            name: "Master Admin",
          })
        );

        navigate("/admin");
        return;
      } else {
        setErrorMsg(
          "Invalid Master Admin credentials."
        );
        return;
      }
    }

    // USER LOGIN
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "role",
        "user"
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      setErrorMsg(
        error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <div className="auth-viewport">
      <div className="login-card-box">

        {/* HEADER */}
        <div className="login-brand">
          <h2>Hubio</h2>

          <p>
            {role === "admin"
              ? "Secure Terminal Access"
              : "Welcome back! Please enter your details."}
          </p>
        </div>

        {/* ERROR */}
        {errorMsg && (
          <div className="auth-error-bubble">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="auth-form-stack"
        >
          {/* EMAIL */}
          <div className="auth-field-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field-group">
            <label>
              {role === "admin"
                ? "Master Passkey / PIN"
                : "Password"}
            </label>

            <div className="password-input-wrapper">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder={
                  role === "admin"
                    ? "••••"
                    : "••••••••"
                }
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <span
                className="eye-icon"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className={`btn-auth-submit ${
              role === "admin"
                ? "admin-btn-color"
                : ""
            }`}
          >
            {role === "admin"
              ? "Initialize Root Terminal"
              : "Sign In to Dashboard"}
          </button>
        </form>

        {/* ROLE TOGGLE */}
        <div className="role-selector-footer">
          <span className="role-label">
            Access Mode:
          </span>

          <div className="toggle-switch-wrapper">
            <button
              type="button"
              className={`role-toggle-btn ${
                role === "user"
                  ? "active-role"
                  : ""
              }`}
              onClick={() => {
                setRole("user");
                setErrorMsg("");
              }}
            >
              Standard User
            </button>

            <button
              type="button"
              className={`role-toggle-btn ${
                role === "admin"
                  ? "active-admin"
                  : ""
              }`}
              onClick={() => {
                setRole("admin");
                setErrorMsg("");
              }}
            >
              System Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;