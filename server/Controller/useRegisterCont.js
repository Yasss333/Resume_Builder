import User from "../models/user";
import bcrypt from 'bcrypt'

export const userregisterhandler=async(req,res)=>{
    const {name , email , password}=req.body;
    try {
        if(!name|| !email ||!password){
            return res.status(400).json({
                message:"All field are reuired"
            })
        }

        const user= await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exist pls try logging in"
            })
        }
          //agar pasowr hash karna i mean maine pehle hi elk method bana rakah ahi db mai 
        //   const hashedpassword =await bcrypt.hash(password,10 )
        const newUser=await User.create({
            name, email, password   
        })

        
    } catch (error) {
       console.log("Failed to register ",error);
        
        
    }
}