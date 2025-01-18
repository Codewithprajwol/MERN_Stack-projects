//? module imports
import express from 'express'

//?file imports
import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import tvRoutes from './routes/tv.routes.js'
import { ENV_VAR } from './config/env.config.js'
import { connectdb } from './config/dbConnect.js'
import cookieParser from 'cookie-parser'
import { protectRoute } from './middleware/protectRoute.js'

const app=express()


const PORT=ENV_VAR.port;

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/movie',protectRoute,movieRoutes)
app.use('/api/v1/tv',protectRoute,tvRoutes)


app.listen(PORT,()=>{
    console.log("Server is listening at port",PORT,)
    connectdb()
})




