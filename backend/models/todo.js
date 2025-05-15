import mongoose from "mongoose";
const todoSche =new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
   
    completed:{
        type:Boolean,
        default:false
    },
   
    
     date:{
         type:Date,
         default:Date.now

     }
    
    
})
// define the model or the collection name :"todo"
const Todo = new mongoose.model("Todo" , todoSche)
export default Todo