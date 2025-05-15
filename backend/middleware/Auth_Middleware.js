import jwt from "jsonwebtoken"
// import User from "../models/UserSchema.js"
import dotenv from "dotenv"

dotenv.config()


// so here checking token for like change password :
// here token is needed bcuz when we sign up or login everytime we get a new token and 
// after login we need to change password so we have to take that new token got generated during login and signup and then 
// we will b changing the existing token and we will save it so here step by step looks like 
const userAuthenication = async(req,res,next)=>{
     
    // get "authorizatin header from the HTTP request inside this op-"
    // const header= req.header('Authorization') // op- "Bearer hreghjfdghjfdhjgjfhdh " so here is bearer + token long string
    // if(!header || !header.startsWith('Bearer')){ // if the token doesnt start with bearer 
    //     res.json( {"msg":"no token found"})
    // }

    const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
    else{
        // so there is a space btn bearer and token (ex: bearer xyz123)
        // const token =header.split(' ')[1] // op: [bearer] [xyz123] in array and now inside token the val is index 1 value mean "xyz123"
        try
        {
            const verified = jwt.verify(token ,process.env.JWT_USER_SECRET) // verifying the token secret key is not tampered or changed 
            // verified ={id:1, name:"john" , iat:djhfjh}
            req.user =verified  // if no error then attach the data to  request after that proceed for further opration like acessing a page , changing a password, protected rotes , etc

            // now we can check like this 
            // req.user=await User.findById(verified).select(-password) 
            next()
        }catch(error){
            res.status(402).json("not verify")
        }
    }
}
export default userAuthenication