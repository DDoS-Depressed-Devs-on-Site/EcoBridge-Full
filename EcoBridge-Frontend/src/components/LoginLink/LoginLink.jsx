import React from 'react'
import './LoginLink.css'
import { Link } from 'react-router-dom'

const LoginLink = () => {
  return (
    <>
      <p className='login-question'>Have an account? <Link to="/login" className='login-link'>Login Here</Link></p>
    </>
  )
}

export default LoginLink