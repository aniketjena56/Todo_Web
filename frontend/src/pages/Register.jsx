import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const  Register =()=> {
const [users, setUsers] = useState({
  name:"",
  email:"",
  password:""
})


const navigate= useNavigate()


// explain
// e.target refers to the input element that triggered the onChange event.
// Every input field in HTML has a name and a value.
// The name is used to identify the input field (name = uname or uemail), and the value is the data that the user(value = john or joh@gmail)

const handleInputChange=(e)=>{
// explain
  const {name , value} = e.target
  setUsers({
    // if we dont use this spread operator than if we left some input field empty it will erase the the field , if we use it will keep blank but not erased the input section from the data
    ...users,
    // so basically spread operator spreading the object like 1-uname , 2 uemail...etc

    [name]:value
  })

}
const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    // post(link of backend where data will b send, the data which will given to send) as it post it will add "user" into that link/server which will b a request sent to server from client to post/add 
    const res =await axios.post(`` ,users)
  
    console.log(res);
      navigate("/")
      toast.success("Registerd, Now Login")

    
  } catch (error) {
    console.error(error);
    toast.error("email exists")
  }
}


  return (
    // flex justify-center items-center  for making content centre
    // h-screen  taking whole horizontal screen centre
    <div className='flex justify-center items-center h-screen bg-gray-500'>
      <div className='bg-white shadow-md p-6 rounded-lg w-96 '>
          <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>

          <form   >

          <label htmlFor="uname"> Name</label>
            <input type="text" name='name' className=' mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none sm:text-sm' onChange={handleInputChange}  />

          <label htmlFor="uemail"> Email</label>
            <input type="text" name='email'className=' mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none sm:text-sm'  onChange={handleInputChange} />
            
          <label htmlFor="upassword"> Password</label>
            <input type="text" name='password' className=' mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none sm:text-sm' onChange={handleInputChange}/>

            <div className='flex justify-center mt-5'>
              <button onClick={handleSubmit} className='p-4.5 bg-red-500 rounded-4xl text-2xl text-amber-50  hover:bg-red-800 transition'>Submit</button>
            </div>
            
            <div>
            <p className='mt-3 text-center'>try Login
            <Link to={"/"} className='hover:underline text-2xl border-l-black'> Login</Link>
            </p>
            </div>
            
          </form>
        </div>
    </div>
  )
}

export default Register

