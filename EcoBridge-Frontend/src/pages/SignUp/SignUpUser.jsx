import React, { useState } from "react";
import "./SignUpUser.css";
import { useNavigate } from "react-router-dom";
import SignUpWelcome from "../../components/SignUpWelcome/SignUpWelcome";
import LoginLink from "../../components/LoginLink/LoginLink";
import SignUpLink from "../../components/SignUpLink/SignUpLink";
import { userSignUp } from "../../scripts/Auth";

const SignUpUser = () => {
  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("User must agree to Terms and Conditions.");
      return;
    }

    const private_key = await userSignUp(
      name,
      username,
      email,
      password,
      contact,
      address,
      profileImage,
      coverImage
    );
    alert(`Successfully Signed Up, you may now login. ${private_key}`);
    nav("/login");
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  return (
    <>
      <section className="signup-section">
        <SignUpWelcome />
        <div className="signup-user-loginlink">
          <LoginLink />
        </div>

        {page == 1 ? (
          <div className="register-container">
            <h2>Create Account</h2>

            <p className="account-type">As a User</p>

            <form className="signup-user-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>

              <label>
                Username
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>

              <label>
                Contact Information
                <input
                  type="text"
                  placeholder="Enter contact info"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </label>

              <button
                type="button"
                className="signup-user-next-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(2);
                }}
              >
                Next
              </button>
            </form>

            <SignUpLink role="organization" path="/signup/create-as-org" />
          </div>
        ) : page == 2 ? (
          <div className="register-container">
            <h2>More Information</h2>

            <form className="signup-org-form" onSubmit={handleSubmit}>
              <label htmlFor="profile-upload">Upload Profile Picture</label>
              <input
                type="file"
                className="profile-upload"
                accept="image/*"
                onChange={handleProfileChange}
              />

              {profileImage && (
                <div className="profile-container">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Picture"
                    className="profile-img"
                  />
                </div>
              )}

              <label htmlFor="cover-upload">Upload Cover Photo </label>
              <input
                type="file"
                className="cover-upload"
                accept="image/*"
                onChange={handleCoverChange}
              />

              {coverImage && (
                <div className="cover-container">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover Photo"
                    className="cover-img"
                  />
                </div>
              )}

              <div className="terms-container">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                ></input>
                <p>
                  By clicking sign up, you agree to our Terms of Use and Privacy
                  Policy.
                </p>
              </div>

              <button
                type="button"
                className="signup-user-back-button"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
              >
                Back
              </button>

              <button type="submit" className="signup-user-button">
                Sign up
              </button>
            </form>

            <SignUpLink role="organization" path="/signup/create-as-org" />
          </div>
        ) : null}
      </section>
    </>
  );
};

export default SignUpUser;
