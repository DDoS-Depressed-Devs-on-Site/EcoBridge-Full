import React from 'react';
import './SignUpLink.css'
import { Link } from 'react-router-dom';

const SignUpLink = ({ role, path }) => {
  return (
    <>
      <p className='or-divider'>or</p>
      <p className='signup-question'>Sign up as <Link to={ path } className='signup-role'>{ role }</Link></p>
    </>
  );
};

export default SignUpLink;
