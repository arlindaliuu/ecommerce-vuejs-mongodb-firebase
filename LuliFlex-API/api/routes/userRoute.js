import express  from "express";
import userController from "../controllers/userController.js";
import bodyParser from 'body-parser';

const userRoute = express.Router();

userRoute.use(bodyParser.json());

userRoute.post('/register', userController.register) 

export default userRoute;