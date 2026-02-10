import mongoose from "mongoose";
import bcrypt from "bcrypt";

    
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre("save",async (next)=>{
     if(!this.isModified('password')) return ;
     this.passowrd= await bcrypt.hash(passowrd,10)
})

userSchema.methods.isPasswordCorrect=async (passowrd)=>{
           return await bcrypt.compare(passowrd,this.passowrd   )
}

const User=new mongoose.model("User",userSchema);


export default User;    