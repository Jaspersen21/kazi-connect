import { useState } from 'react'
import { getToken, removeToken, setToken } from '../lib/auth'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setAuthToken] = useState<string | null>(getToken())

  const login = (newToken: string) => {
    setToken(newToken)
    setAuthToken(newToken)
  }

  const logout = () => {
    removeToken()
    setAuthToken(null)
  }

  const value = {
    token,
    isLoggedIn: Boolean(token),
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}