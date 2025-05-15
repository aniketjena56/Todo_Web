import User from "../models/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export async function registerUser(req, res) {

   // when a server gets a request to add a data in db sent by the client
   const uname = req.body.name
   // const password = req.body.password// onl by ths we will get normal string the value not a secure one
   // so we will use to hash the password by using bcrypt
   const upassword = await bcrypt.hash(req.body.password, 4)

   // hash(password , salt or rounds)
   //         A random salt is generated (16 bytes).

   // The password is combined with the salt.
   // Bcrypt runs a slow algorithm (EksBlowfish) 4096 times.
   // Returns the hashed output that looks like this: $2b$12$randomSaltAndHashedPassword

   const uemail = req.body.email

   try {

      const userExist = await User.findOne({ email: uemail })
      if (userExist) {
         return res.status(400).json({ msg: "email exists" })
      }
      else {



         // so now we have to create a new object of user to store the details in db
         const newUser = new User({
            "name": uname,
            "password": upassword,
            "email": uemail

         })

         const saveUser = await newUser.save() // added in db
        

         res.status(200).json({ "user": saveUser });
      }

   } catch (error) {
      res.status(500).json({ "error": error })


   }

}


export const loginUser = async (req, res) => {
   const uemail = req.body.email
   const upassword = req.body.password

   try {
      const userExist = await User.findOne({ email: uemail })
      if (userExist) {
         // now check or compare password given and saved in db compare(current password got as req , password saved in db attached to the email u got as"userExist")
         const isMatch = await bcrypt.compare(upassword, userExist.password) // return true  or false
         //  if false
         if (!isMatch) {
            res.status(401).json({ "msg": "User not found" })
         }
         else {
            // to avoid further login repeats
            const token = jwt.sign(
               // payload (data as user_id , user_email ) the str will b like this 
               { id: userExist._id, email: userExist.email },
               // tokens secret 
               process.env.JWT_USER_SECRET,
               // EXPIRY OF TOKEN for 1h : 1 hour , 1d : 1 day
               { expiresIn: "1d" }
            )
            // "token" variable is holding now the long string of header , payload , signature
            res.status(200).json({ "token": token })
         }

      }
      else {
         return res.status(400).json("User not found")

      }



   } catch (error) {
      res.status(500).json({ "error": error })

   }

}
