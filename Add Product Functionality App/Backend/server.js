import express from 'express'
import 'dotenv/config'
import routes from './routes/product.routes.js';
import { connectdb } from './config/dbconnect.js';
const PORT=(process.env.PORT) || 3000;
const app=express()

app.use(express.json())

app.use('/api/product',routes)


app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
})