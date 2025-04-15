import { useState } from 'react'
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {
  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
