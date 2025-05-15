import express from "express"
import { registerUser ,loginUser } from "../controller/controller.js";
import { createTodo, deleteTodo, fetchTodo, updateTodo } from "../controller/todocontrol.js";
import userAuthenication from "../middleware/Auth_Middleware.js"

const router = express.Router()

// when we add a data through server post()
router.post("/register" , registerUser )
router.post("/" ,loginUser)
router.post("/home"  ,createTodo)
router.put("/home/:id",updateTodo)
router.delete("/home/:id" , deleteTodo)
router.get("/home" ,fetchTodo)


export default router
// check what to do with userAuthenication

// /home is acessible what to do to avoid it 
// id is not able to get for edit or del
// the datas are not getting save in array i saw in response
// how to deal with protected routes using jwt or smthing else
