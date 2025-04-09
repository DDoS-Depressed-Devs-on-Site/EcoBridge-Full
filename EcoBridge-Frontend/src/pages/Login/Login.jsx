import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import SignUpWelcome from "../../components/SignUpWelcome/SignUpWelcome";

const Login = () => {
  const navigate = useNavigate();

  return (
    <section className="login-section">
      <SignUpWelcome />

      <div className="login-outer-container">
        <div className="login-container">
          <h2>Sign In</h2>
          <p>Stay engaged in the community!</p>

          <div className="button-login-choice">
            <button
              className="login-button"
              onClick={() => navigate("/login/as-user")}
            >
              Login as User
            </button>

            <button
              className="login-button"
              onClick={() => navigate("/login/as-org")}
            >
              Login as Organization
            </button>
          </div>

          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>

        <p className="signup-question">
          New to EcoBridge?{" "}
          <Link to="/signup" className="signup-link">
            Join Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
