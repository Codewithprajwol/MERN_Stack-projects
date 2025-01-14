import express from 'express'
import 'dotenv/config'

import authRoutes from './Routes/auth.routes.js'
import userRoutes from './Routes/user.routes.js'
import postRoutes from './Routes/post.routes.js'
import notificationRoutes from './Routes/notification.routes.js'

import { connectdb } from './config/db.config.js'
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from "cloudinary"

const app=express()

const PORT=process.env.PORT || 3000; 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/notification',notificationRoutes)

app.listen(PORT,()=>{
    console.log('server is listening on port 4000');
    connectdb()
})
