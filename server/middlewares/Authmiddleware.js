//get toeknf orm headers 
//validat token 
//get teh decded token by verify jwt 
//atach it to the suer and call next()

import jwt, { decode } from "jsonwebtoken";

const verifyJWT=async(req,res,next)=>{
    try {
        const token= req.headers.authorization;
        if(!token){
            res.status(200).json({message:" you are Unauthorized "})
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        
        next();
    } catch (error) {
        res.status(400).json({message:" Failed to verify JWT  "},error)
    }

} 


export default verifyJWT;   