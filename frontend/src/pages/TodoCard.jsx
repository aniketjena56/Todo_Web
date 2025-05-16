import React, { useEffect, useState } from 'react'
import axios  from "axios"

function TodoCard() {
  const [todos, setTodos]= useState([])
  const [needId, setNeedId] = useState(null)
  const [needText , setNeedText] = useState("")
  const [popup , setPopup] = useState(false)
  const [newTodo, setNewTodo] =useState("")
  
  const BASE_URL = import.meta.env.VITE_API;

  // get the todo data from DB so to get once we use useeffect , not needed for Add or update , delete
  useEffect(()=>{
      const fetchTodos=async ()=>{
      try {
         const token = localStorage.getItem("token"); 
         const res = await axios.get(`${BASE_URL}/home`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Attach token here
          },
        });
        console.log(res.data);
        setTodos(res.data) // inside{message{} , todos[]} //because backend sends array directly
      } catch (error) {
        console.status(402).json({"message":error});
      }
    }
    fetchTodos()
  } ,[])

  const createTodo=async ()=>{
    try {
      if(newTodo === "")
      return ;
    
    
    
   
    // when we click "Add" we get a new data and then make a request to save the data in db and also to create a new file 
   const token = localStorage.getItem("token")
      const addTodo = await axios.post(`${BASE_URL}/home`,{text: newTodo , completed:false } ,{
        headers:{
        Authorization : `Bearer ${token}`
      }
      })
      // then set the todo with previous data and a new data 
        setTodos([
          ...todos, addTodo.data.todo]// ✅ because backend sends {todo: {}}
        )
        console.log(todos);
        setNewTodo("");
        }
       catch (error) {
       console.error(error);
            
    }

  }
      
   
    
  // when "edit" btn gets clicked then it gets id 
  const handleEdit = (todoId)=> {
    if(!todoId ){
      return ;
    }
  // to get the todo through id
  // so inside "todos" a array of todo is there , so here we will find the id by comparing the (id we clicked and the id in the array saved)
  // "t" is a variable to acess each element in the "todos" array
  const todo = todos.find(t => t._id === todoId)
  setNeedId(todo._id)
  setNeedText(todo.text)
  setPopup(true)
  }

  // to save the edit when we click "save"
  const updateTodo= async()=>{
    try {
      
       const res=await axios.put(`${BASE_URL}/home/${needId}` , {text : needText} ,{
        headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`}
      })
    // so here map created a new array and search the id with given id to add the edited text on that id
    // (inside ) mean if we wont get the text then save the same text without any change and if got then update with the new text
    setTodos(todos.map(t=>t._id === needId ? res.data.todo : t))

    setNeedId(null)
    setNeedText("")
    setPopup(false)
    } catch (error) {
      console.error(error);
      
      
    }
   

  }


// so when clicked on the delete btn a id gets passed as an argument and here passed as parameter 
const deleteTodo=async (todoId)=>{
  try {
      await axios.delete(`${BASE_URL}/home/${todoId}`,{
        headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`}})
    //  and now filter the by removing by creating a new array where the id is not there 
     setTodos(todos.filter(t=>t._id !== todoId))
  } catch (error) {
    console.error(error);
    
  }

  }
  const handleToggle= async(todo)=>{
    // so here we are toggling the todo by changing the completed status
    // so when we click the checkbox then we get a todo list and then we spread one by one and then of the list like 1st id , then copying them till "completed part comes then change the value to true then copy all and sent as puut request to update in DB"
    const updatodo= {
      // ...todo to copy the whole detail of a todo like its id , text ,completed and then change the complted part by checking
      ...todo, completed:!todo.completed
    }
    try {
      // sending the updated data with a put request to update on dB
      const res= await axios.put(`${BASE_URL}/home/${todo._id}`, {completed: updatodo.completed,
        text: updatodo.text,},{
        headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`}})
      // now replace the old array with new array with the updated data , as maps create a new array
      // check the todo id we changed and t.id mean the data in new array if matched the update the new data or replace old data
      setTodos(todos.map(t=>t._id === todo._id ? res.data.todo : t))

    } catch (error) {
      console.error(error);
      
    }
    
  }




  return (


    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Todo List</h1>
     {/* Add Todo */}
     <div className="flex gap-2 mb-6">
        <input
          type="text"
          
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={createTodo}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    

  <ul className="space-y-2">
      {todos.map(todo => (

        <li key={todo._id}
            
            className="flex items-center justify-between bg-gray-100 p-3 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span
              // if "todo"(mean a element)."completed" is true then show a line or a nothing 
                className={`text-blue-950 ${todo.completed ? 'line-through text-gray-400' : ""}`}
              >
                {todo.text}
              </span>
            </div>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleEdit(todo._id)}>Edit</button>
           
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>

    {/* Edit Popup */}
    {popup && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
        <div className="bg-white p-4 rounded shadow-md w-80">
          <h2 className="text-lg font-semibold mb-2">Edit Todo</h2>
          <input
            type="text"
            value={needText}
            onChange={(e) => setNeedText(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setPopup(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded" >Cancel</button>

            <button
              onClick={updateTodo}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default TodoCard
 