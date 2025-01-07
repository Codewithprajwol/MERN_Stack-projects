import express from 'express'
import 'dotenv/config'
import authRoute from './Routes/auth.routes.js'
import { connectdb } from './config/db.config.js'

const app=express()

const PORT=process.env.PORT || 3000; 

app.use(express.json())

app.use('/user/auth',authRoute)

app.listen(PORT,()=>{
    console.log('server is listening on port 4000');
    connectdb()
})
