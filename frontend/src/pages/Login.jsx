import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from "react-toastify"
import { useAuth } from './AuthContext'


const Login = () => {
  const BASE_URL = import.meta.env.VITE_API;

  const navigate = useNavigate()
  // before :In your Login.jsx → after successful login, call setUser(token) from context → right now you only save to localStorage but don’t update the context.

  // but now /After On login:

  // backend sends { token: ... }
  // you save it to localStorage and update setUser(token) in context
  // On refresh:
  // AuthContext runs its useEffect, finds the token in localStorage
  // calls setUser(utoken) → user is restored


  const { setUser } = useAuth()

  const [users, setUsers] = useState({

    email: "",
    password: ""

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsers(
      {
        ...users,
        [name]: value
      }
    )
  }

  async function submit(e) {
    e.preventDefault()
    try {
      const axi = await axios.post(`${BASE_URL}`, users)
      console.log(axi.data);

      if (axi.data && axi.data.token)
        // storing in local storage like we do with cookies
        localStorage.setItem("token", axi.data.token) // storing data in local storage in a key val pair
      // setItem(key: string, value: string): void

      // Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
      // Dispatches a storage event on Window objects holding an equivalent Storage object.


      // now to get the data from localStorage so we will only get the token data like to change password but not during login and sign up
      // const token = localStorage.getItem("utoken")
      setUser(axi.data.token)
      navigate("/home")
      toast.success('Login Sucessful')


    } catch (error) {

      console.log(error);
      toast.error("login failed")


    }




  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-500'>
      <div className='bg-white shadow-md p-6 rounded-lg w-96 '>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <form action=""  >
          <label htmlFor="email">Email</label>
          <input type="text" name='email' className=' mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-nonet' onChange={handleChange} />

          <label htmlFor="password" >Password</label>
          <input type="password" name='password' className=' mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-nonet' onChange={handleChange} />

          <div className='flex justify-center mt-5'>
            <button onClick={submit} className='p-4.5 bg-red-500 rounded-4xl text-2xl text-amber-50  hover:bg-red-800 transition'>Submit</button>
          </div>

          <div>
            <p className='mt-3 text-center'>not registered yet
              <Link to={"/register"} className='hover:underline border-l-black'> Register</Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  )
}

export default Login

// https://chatgpt.com/share/67f8e45b-935c-8005-a524-ddeee839db9f