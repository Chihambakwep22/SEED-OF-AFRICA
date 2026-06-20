import { createContext, useContext, useEffect, useState } from 'react'
import { authAPI, tokenStorage } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tokenStorage.getAccess()) {
      setLoading(false)
      return
    }
    authAPI.me()
      .then(({ data }) => setUser(data))
      .catch(() => tokenStorage.clear())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await authAPI.login({ email, password })
    tokenStorage.set(data.access, data.refresh)
    setUser(data.user)
    return data.user
  }

  const registerEntrepreneur = async (formData) => {
    await authAPI.registerEntrepreneur(formData)
  }

  const registerEnterprise = async (formData) => {
    await authAPI.registerEnterprise(formData)
  }

  const logout = () => {
    tokenStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerEntrepreneur, registerEnterprise }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
