import React from 'react';
import './LoginAsLink.css'
import { Link } from 'react-router-dom';

const LoginAsLink = ({ role, path }) => {
  return (
    <>
      <div className='login-as-container'>
        <p className='login-or-divider'>or</p>
        <p className='login-as-question'>Login as <Link to={ path } className='login-as-role'>{ role }</Link></p>
      </div>
    </>
  );
};

export default LoginAsLink;
