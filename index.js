import { Router } from "express";
import express from "express";
import {ConnectDB} from "./src/helper/dbConnection.js"

const app=express();
const router=Router();

import dotenv from "dotenv";
import { connect } from "mongoose";
import routes from "./router.js";
dotenv.config();


const PORT=process.env.PORT; // Imported from .env file


app.use(express.json());
app.use(express.urlencoded({extended:true}))
ConnectDB()


routes(app);
app.listen(PORT,()=>{
    console.log("Server listing on PORT:",PORT)
});