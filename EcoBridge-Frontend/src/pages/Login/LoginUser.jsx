import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../scripts/Auth";
import "./Login.css";
import SignUpWelcome from "../../components/SignUpWelcome/SignUpWelcome";
import UserContext from "../../scripts/Context/UserContext";
import { User } from "../../scripts/Context/UserContext.jsx";
import LoginAsLink from "./LoginAsLink"; // Add this import

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await userLogin(email, password);
    if (result) {
      const user_ = new User(result.user);
      setUser(user_);
      nav("/community");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="login-section">
      <SignUpWelcome />

      <div className="login-outer-container">
        <div className="login-container">
          <h2>Sign In</h2>
          <p>Stay engaged in the community!</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label>
                Email
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="input-container">
              <label>
                Password
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>

          <LoginAsLink role="organization" path="/login/as-org" />
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

export default LoginUser;
