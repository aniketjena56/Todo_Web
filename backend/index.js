import express from "express"

import Au_router from "./Route/auth_Router.js"
import connectDb from "./db/userDb.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

// Mount the roter : placing the route on the main express file  or code
app.use("/" , Au_router)

// returns a promise as async , await is use
connectDb().then(()=>{

// start server
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`port run on ${port}`);
    
    
})

})