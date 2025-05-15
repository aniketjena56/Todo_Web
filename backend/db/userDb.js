import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
// const schema = moongoose.Schema()
const URI = process.env.MONGO_URI  // process.env.MONGODB_URI
const connectDb = async()=>{
    try{
        await mongoose.connect(URI)
        console.log("Mongodb Connected")
    } 
    catch (error){
         console.error("failed")
        //  process.exit(0)
    }
   
    
}

export default connectDb