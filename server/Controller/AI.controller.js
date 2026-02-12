//this controller is for the ai used to enhance the text

import { response } from "express";
import openai from "../config/ai.js";
import Resume from "../models/resuem.model.js";

//POST:/api/ai/ehance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res
        .status(400)
        .json({ message: "User content not provided, missin required fields" });
    }
    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer and ATS optimization expert. Your task is to rewrite and enhance the user's professional summary to make it clear, concise, and professional. The summary must be ATS-friendly with no fluff, emojis, or special symbols. Use confident but natural language suitable for software engineering, tech, or professional roles. Ensure the content is grammatically correct, well-structured, and impact-driven, focusing on skills, experience, and value. Do not add false experience or fake achievements. Do not change the core meaning of the user's content. Do not mention that AI was used. Keep the output limited to 3–4 short, strong sentences. Avoid unnecessary buzzwords and use action-oriented language. Output only the enhanced professional summary.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const ehancedSolution = response.choices[0].message.content;
    return res.status(200).json({ ehancedSolution });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//this controller id for ehancing the job description
// POST:/api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res
        .status(400)
        .json({ message: "User content not provided, missin required fields" });
    }
    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME,
      messages: [
        {
          role: "system",
          content:
            "You are a professional recruiter and job description optimization expert. Your task is to rewrite and enhance the user's job description to make it clear, structured, and professional. Ensure the description is ATS-friendly and easy to understand, with concise and well-organized content. Improve clarity, grammar, and flow while preserving the original meaning and responsibilities. Do not add false requirements, fake responsibilities, or unrealistic expectations. Keep the tone professional and neutral. Avoid unnecessary buzzwords and filler text. The output should be clean, readable, and suitable for posting on job portals or internal hiring platforms. Output only the enhanced job description.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });
    const ehancedSolution = response.choices[0].message.content;
    return res.status(200).json({ ehancedSolution });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for resume uploads 
//POST:/api/ai/uplaod-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumetext,title } = req.body;
    const systemPrompt="you are a expert AI agent which extract data from resumes "
    const userPrompt=`extract data from this resume :${resumetext}
    
    Provide data in the following JSON fromat with no additonal text before or after:
    {
      proffession_summary:{
            type:String,
            default:""
        },
 
        skills:[{type:String}],

       personal_info:{
        image:{type:String,default:""},
        full_name:{type:String ,default:""},
        proffesion:{type:String ,default:""},
        email:{type:String ,default:""},
        phone:{type:Number ,default:""},
        location:{type:String ,default:""},
        linkedin:{type:String ,default:""},
        website:{type:String ,default:""},
       },
       experience:[
        {
            company:{type:String},
            positon:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            description:{type:String},
            is_current:{type:String},
        }
       ],
       projects:[
        {
            name:{type:String},
            type:{type:String}, 
            description:{type:String},
        }
       ],
       education:[
        {
             institution:{type:String},
            degree:{type:String},
            field:{type:String},
             gpa:{type:Number},
        } 
    }`
    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME,
      messages: [
        {
          role: "system",
          content:systemPrompt
        },
        {
          role: "user",
          content: userPrompt ,
        },
      ],
      response_format:{type:"json_object"}
    });
    const extractedData=response.choices[0].message.content
    const parsedExtratedData=JSON.parse(extractedData);
    const newResume=await Resume.create({userId, title, ...parsedExtratedData})

    return res.status(200).json({ resumeId:newResume._id})
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};