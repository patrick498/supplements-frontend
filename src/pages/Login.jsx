console.log('✅ Login component loaded')

import React from 'react'
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

console.log('useSignIn:', useSignIn)

export default function Login() {
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({
    email_address: '',
    password: '',
  })
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const onSubmit = (e) => {
    console.log('inside onSubmit')
    console.log('formData:', formData)

    e.preventDefault()

    axios.post(`${baseURL}/api/v1/login`, formData).then((res) => {
      console.log('inside axios post then')
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
          // Only if you are using refreshToken feature
          // Redirect or do-something
        } else {
          //Throw error
        }
      }
    })
  }

  return (
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
  )
}
