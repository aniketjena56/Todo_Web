import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {FaTimes , FaBars} from "react-icons/fa"

import TodoCard from './TodoCard'

import { useAuth } from './AuthContext'

function Navbar() {
  const [isOpen , setIsOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const navigate =useNavigate()
  const { logout } = useAuth()

  const outFunc=()=>{
    // want to use useEffect will it b ok - yes but its a user trigger action , doesnt affect during rendering so no use effect also ok 
      logout()
      setConfirm(false)
      navigate("/")
  }
  
  
  return (
    <div>
       <nav className='bg-blue-900 shadow-md '>
        <div className='container flex justify-between items-center'>
            <h2 className='text-3xl text-white p-2'>ToDo</h2>
            
           <ul className='hidden md:flex gap-7  text-white'>
                <li>
                  <Link to={"/home"} className=' text-white hover:underline '>Home</Link>
                </li>
                <li>
                  <Link to={"/contact"} className='text-white hover:underline'>Contact</Link>
                </li>
               <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={()=>{setConfirm(true)}}>Logout</button>
           </ul>

           {/* so it will work like if the "isOpen is fatimes then set it to fabars but only 
           change when its clicked on it" */}
          {/* not working  */}

           <button className='text-white text-2xl md:hidden' onClick={()=>setIsOpen(isOpen ?false :true)}>
           {/* if true then fabars and in set change on click and vice versa */}
            {isOpen?<FaTimes/>:<FaBars/>}
           </button>


        </div>
        {/* Mobile menu toggle*/}
        {isOpen  && (
          <ul className='md:hidden bg-gray-50 p-4 space-y-4 absolute left-0 w-full shadow-lg'  >
                <li>
                  <Link to={"/home"} className='block py-2' onClick={()=>setIsOpen(false)}>Home</Link>
                </li>
                <hr className="border-t border-gray-300" />

                <li>
                  <Link to={"/contact"} className='block py-2' onClick={()=>setIsOpen(false)}>Contact</Link>
                </li>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={()=>{setConfirm(true)}}>Logout</button>

          </ul>
        )}
        
       </nav>
{/* logout confirmation pop up : when confirm is true the pop up page will display  */}
       {confirm && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Want to leave</h2>
          <div className='flex justify-between items-center '>
            <button className=" px-4 py-2 bg-red-600 rounded" onClick={outFunc}>yes</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={()=>{setConfirm(false)}}>no</button>
          </div>
        </div>
       </div>
       )}
<div>
<TodoCard/>
</div>

    </div>
    
    
  )
}

export default Navbar


