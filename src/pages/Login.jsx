import React from 'react'
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({
    email_address: '',
    password: '',
  })
  const [error, setError] = React.useState(null)
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    axios
      .post(`${baseURL}/api/v1/login`, formData)
      .then((res) => {
        if (res.status === 200) {
          if (
            signIn({
              auth: {
                token: res.data.token,
                type: 'Bearer',
              },
              refresh: res.data.refreshToken,
              userState: res.data.authUserState,
            })
          ) {
            navigate('/intakes')
          } else {
            throw new Error('Sign-in failed')
          }
        }
      })
      .catch((err) => {
        console.error('Login error:', err)
        if (err.response && err.response.status === 401) {
          setError('Invalid email or password.')
        } else {
          setError('Something went wrong. Please try again.')
        }
      })
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            type={'email_address'}
            onChange={(e) =>
              setFormData({ ...formData, email_address: e.target.value })
            }
          />
          Password
          <input
            type={'password'}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}
