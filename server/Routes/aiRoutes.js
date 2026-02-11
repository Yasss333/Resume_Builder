import express from "express";
import verifyJWT from "../middlewares/Authmiddleware";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../Controller/AI.controller.js";

const AIRouter=express.Router();

AIRouter.post("/enhance-pro-sum", verifyJWT,enhanceProfessionalSummary )
AIRouter.post("/enhance-pro-job", verifyJWT,enhanceJobDescription )
AIRouter.post("/upload-resume", verifyJWT, uploadResume)

export default AIRouter;