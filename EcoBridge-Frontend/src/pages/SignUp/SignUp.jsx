import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import SignUpWelcome from '../../components/SignUpWelcome/SignUpWelcome'
import LoginLink from '../../components/LoginLink/LoginLink'

const SignUp = () => {
  const navigate = useNavigate()

  const handleOrgRedirect = () => {
    navigate('/signup/create-as-org')
  }

  const handleUserRedirect = () => {
    navigate('/signup/create-as-user')
  }

  return (
    <>
      <section className= 'signup-section'>
        <SignUpWelcome />

        <div className='register-container'>
          <div className='create-account-container'>
            <h6>Create Account</h6>

            <div className='buttons-container'>
              <button className='create-org-button' onClick={ handleOrgRedirect }>
                  As an Organization
              </button>
              <button className='create-user-button' onClick={ handleUserRedirect }>
                  As a User
              </button>
            </div>
          </div>

          <div className='signup-loginlink'>
            <LoginLink />
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp