import express from "express";
import verifyJWT from "../middlewares/Authmiddleware.js";
import { createResumeHandler, deleteResumehandler, getPublicResumeById, getResumeById, updateResumeHandler } from "../Controller/resumeController.js";
import upload from "../config/multer.js";

const resumeRouter=express.Router();

resumeRouter.post("/create",verifyJWT,createResumeHandler);
resumeRouter.put("/update",upload.single('image'),verifyJWT,updateResumeHandler)
resumeRouter.delete('/delete/:resumeId',verifyJWT,deleteResumehandler);
resumeRouter.get('/getResumeById/:resumeId',verifyJWT,getResumeById );
resumeRouter.get('/getPublicResumeById/:resumeId',getPublicResumeById );


export default resumeRouter;