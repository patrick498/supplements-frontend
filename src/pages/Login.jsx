console.log('✅ Login component loaded')

import React from 'react'
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

console.log('useSignIn:', useSignIn)

export default function Login() {
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', formData).then((res) => {
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
      <input
        type={'email'}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type={'password'}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button>Submit</button>
    </form>
  )
}

// export default function Login() {
//   const { signIn } = useSignIn()
//   const navigate = useNavigate()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   const onSubmit = async (data) => {
//     try {
//       const res = await API.post('/login', data)
//       const token = res.data.token

//       const success = signIn({
//         auth: {
//           token,
//           type: 'Bearer',
//         },
//         userState: { email: data.email },
//       })

//       if (success) {
//         navigate('/')
//       } else {
//         console.error('Login failed')
//       }
//     } catch (err) {
//       console.error('Login error:', err)
//     }
//   }

//   return (
//     <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
//       <h1 className="text-xl font-bold mb-6 text-center">Login</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block mb-1 text-sm font-medium">Email</label>
//           <input
//             type="email"
//             className="w-full p-2 border rounded"
//             {...register('email', { required: 'Email is required' })}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Password</label>
//           <input
//             type="password"
//             className="w-full p-2 border rounded"
//             {...register('password', { required: 'Password is required' })}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Log in
//         </button>
//       </form>
//     </div>
//   )
// }
