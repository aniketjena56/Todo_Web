import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
export const ContextProvider = ({ children }) => {
  // for authenication we r checking if the user is having 
  const [user, setUser] = useState(null) // { name: ... } or null
  const [loading, setLoading] = useState(true);
  // using bcuz :
  // On page refresh → your app re-mounts
  // The AuthContext runs and sets user from localStorage
  // BUT → by the time your ProtectedRoute runs paralel, the user is still null, because the context hasn’t updated yet
  // so till user get updated with the existng token protected route have to wait till loading gets false / over
  // so if loading is true show loading and as soon as the "setUser" gets updated "loading" is false

  // Check localStorage token on app load
  useEffect(() => {
    const utoken = localStorage.getItem("token")
    if (utoken) {
      setUser(utoken)
    }
    setLoading(false) // loading complete
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }



  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// doubt - everytime we login even its wrong dtill it generate token
// can i move anavbar using context and react authenication without making protected routes, margin in betn
// https://chatgpt.com/share/67f94b18-a760-8005-8896-f82736385486