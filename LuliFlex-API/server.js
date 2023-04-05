import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import categoryRoute from './api/routes/categoryRoutes.js'
import cors from 'cors';
import mongoose from "mongoose";
import userRoute from './api/routes/userRoute.js';
const MONGO_CONNECTION_URI= process.env.MONGO_CONNECTION_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const API_PORT = process.env.API_PORT;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;

mongoose.connect(`${MONGO_CONNECTION_URI}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`).then(()=>{
    console.log(`connected to mongodb on port ${MONGO_DB_PORT}`);
    const app = express();
    
    app.use(
        cors({
            origin: '*'
        })
    )
    
    app.use('/product', categoryRoute)
    app.use('/users', userRoute)

    app.listen(API_PORT, () =>{
        console.log(`LULIFLEX API listening on port " + ${API_PORT}`)
    })
    
}).catch((error)=>{
    console.log(error)
})






