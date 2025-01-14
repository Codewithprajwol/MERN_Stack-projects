//? module imports
import express from 'express'
import authRoutes from './routes/auth.routes.js'
//?file imports
import { ENV_VAR } from './config/env.config.js'
import { connectdb } from './config/dbConnect.js'

const app=express()


const PORT=ENV_VAR.port;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/auth',authRoutes)



app.listen(PORT,()=>{
    console.log("Server is listening at port",PORT,)
    connectdb()
})