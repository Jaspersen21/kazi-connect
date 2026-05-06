import { useState } from 'react'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/useAuth'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await loginUser(email, password)
      login(data.access_token)
      console.log('login successful', data)
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-full max-w-sm p-6 border rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage