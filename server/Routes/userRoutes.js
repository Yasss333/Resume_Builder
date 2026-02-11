import express from "express";
import { getUserId, getUserResume, loginUser, userregisterhandler } from "../Controller/useRegisterCont";
import verifyJWT from "../middlewares/Authmiddleware";

const router=express.Router();

router.post("/registeruser",userregisterhandler);
router.post('/login',loginUser);
router.get("/data",verifyJWT,getUserId)
router.get("/resumes",verifyJWT,getUserResume)


export default router;