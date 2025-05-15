import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './pages/Navbar'
import { ContextProvider } from './pages/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import Contact from './pages/Contact'



const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              // if i got token then only navbar is accesible 
              <PrivateRoute>
                <Navbar />
              </PrivateRoute>
            }/>
            <Route path='/contact' element={
              <PrivateRoute>
                <Contact/>
              </PrivateRoute>
            } />
          
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
