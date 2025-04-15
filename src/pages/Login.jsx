import { useForm } from 'react-hook-form'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import API from '../api' // Your Axios instance

export default function Login() {
  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Access signIn method from react-auth-kit
  const signIn = useSignIn()

  // useNavigate lets you redirect after login
  const navigate = useNavigate()

  // Submit handler: triggered when form is valid and submitted
  const onSubmit = async (data) => {
    try {
      // Send login request to Rails API
      const res = await API.post('/login', data)

      // Extract the JWT from the response
      const token = res.data.token

      // Save token using react-auth-kit
      const success = signIn({
        token,
        expiresIn: 3600, // token expiry in seconds (1 hour here)
        tokenType: 'Bearer',
        authState: { email: data.email }, // optional user info
      })

      // Redirect to homepage on success
      if (success) {
        navigate('/')
      } else {
        console.error('Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
