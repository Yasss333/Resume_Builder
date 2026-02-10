import express from "express";
import "dotenv/config";
import cors from "cors"
import dbConnect from "./dbconfig/db.js";
const app=express();

const PORT=process.env.PORT ?? 3000;
 
await dbConnect()
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    return res.send("Hello frm server")
})

app.listen(PORT,(req,res)=>{
    console.log("Server on hai 💘 ");
    
})
