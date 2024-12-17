import mongoose from "mongoose";

export const ConnectDB=()=>{
    try{
         mongoose.connect(process.env.DB_URL,{dbname:process.env.DB_NAME});
         console.log("Databse connected successfully");
    }catch(error){}
}