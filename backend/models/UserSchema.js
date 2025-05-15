
import mongoose from "mongoose";
const userSche =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
   
    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    }
    
})
// define the model or the collection name :"User"
const User = new mongoose.model("User" , userSche)
export default User