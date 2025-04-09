import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { orgLogin } from "../../scripts/Auth";
import './LoginOrg.css'
import SignUpWelcome from '../../components/SignUpWelcome/SignUpWelcome'
import LoginAsLink from './LoginAsLink'
import OrgContext from "../../scripts/Context/OrgContext.jsx";
import { Organization } from "../../scripts/Context/OrgContext.jsx";


const LoginOrg = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate();
  const {org, setOrg} = useContext(OrgContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await orgLogin(email, password);
    if (result) {
      const org_ = new Organization(result.organization);
      setOrg(org_);
      nav("/profile");
    }else{
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <section className='login-section'>
        <SignUpWelcome />

        <div className='login-outer-container'>
          <div className='login-container'>
            <h2>Sign In</h2>
            <p>As an Organization</p>

            <form className='login-form' onSubmit={handleSubmit}>
              <div className='input-container'>
                <label>
                  Email
                  <input type="email" placeholder="Enter email" value= { email } onChange={ (e) => {setEmail(e.target.value)} }/>
                </label>  
              </div>
              
              <div className='input-container'>
                <label>
                  Password
                  <input type="password" placeholder="Enter password" value= { password } onChange={ (e) => {setPassword(e.target.value)} }/>
                </label>
              </div>

              <button type="submit" className="login-button">
                Sign in
              </button>
            </form>

            <LoginAsLink role = "user" path = "/login/as-user"/>

          </div>

          <p className='signup-question'>New to EcoBridge? <Link to="/signup" className='signup-link'>Join Now</Link></p>

        </div>
      </section>
    </>
  )
}

export default LoginOrg