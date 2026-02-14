//this controller is for the ai used to enhance the text

import { response } from "express";
import genAI from "../config/ai.js";
import Resume from "../models/resuem.model.js";
import OpenAI from "openai";
import openai from "../config/ai.js";
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

//refactoring hte whole contreoller because chanfing the openAI sdk to gemini sdk

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeText, title } = req.body;
    if (!resumeText || !title) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const systemPrompt = `
You are a highly accurate resume parsing AI.

Your job is to extract structured information from resume text and return ONLY valid JSON.

Strict rules:
- Output must be valid JSON.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT include comments.
- Do NOT include schema definitions.
- Return only real extracted values.
- If a value is missing, return "" or [].
- Do not hallucinate information.
- Boolean fields must be true or false.
`;

    const userPrompt = `
Extract structured information from the following resume text.

Return ONLY JSON in this exact format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "projects": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "gpa": 0
    }
  ]
}

Resume Text:
${resumeText}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });
    // console.log("BASE:", process.env.GEMINI_BASE_URL);
    console.log("MODEL:", process.env.MODEL_NAME);

    const extractedData = response.choices[0].message.content;
    const parsedExtratedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedExtratedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.log("OPENAI ERROR:", error);
    // console.log("UPLOAD ERROR:", error);
    return res.status(400).json({ message: error.message });
  }
};

//this tjhe conroler woithj gemini sdk

// export const uploadResume = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { resumeText, title } = req.body;

//     if (!resumeText || !title) {
//       return res.status(400).json({ message: "Missing resume text or title" });
//     }

//     // 🔹 Get Gemini model
//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-1.5-flash"
//     });

//     // 🔹 System instructions
//     const systemPrompt = `
// You are an expert resume parsing AI.

// Your job is to extract structured data from resumes and return ONLY valid JSON.

// Rules:
// - Output must be strictly valid JSON.
// - Do not include explanations.
// - Do not include markdown.
// - If a field is missing, return "" or [].
// - Do not hallucinate data.
// `;

//     // 🔹 User prompt with clean JSON template
//     const userPrompt = `
// Extract structured information from this resume.

// Return ONLY valid JSON in this format:

// {
//   "professional_summary": "",
//   "skills": [],
//   "personal_info": {
//     "image": "",
//     "full_name": "",
//     "profession": "",
//     "email": "",
//     "phone": "",
//     "location": "",
//     "linkedin": "",
//     "website": ""
//   },
//   "experience": [
//     {
//       "company": "",
//       "position": "",
//       "start_date": "",
//       "end_date": "",
//       "description": "",
//       "is_current": false
//     }
//   ],
//   "projects": [
//     {
//       "name": "",
//       "type": "",
//       "description": ""
//     }
//   ],
//   "education": [
//     {
//       "institution": "",
//       "degree": "",
//       "field": "",
//       "gpa": ""
//     }
//   ]
// }

// Resume Text:
// ${resumeText}
// `;

// const response = await openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   messages: [
//     { role: "system", content: SYSTEM_PROMPT },
//     { role: "user", content: userPrompt },
//   ],
// });

//     // 🔹 Generate AI response
//     // const result = await model.generateContent({
//     //   contents: [
//     //     { role: "user", parts: [{ text: systemPrompt + "\n" + userPrompt }] }
//     //   ],
//     //   generationConfig: {
//     //     responseMimeType: "application/json"
//     //   }
//     // });

//     // const response = await result.response;
//     const text = response.text();

//     // 🔹 Safe JSON parse
//     let parsedData;
//     try {
//       parsedData = JSON.parse(text);
//     } catch (err) {
//       console.log("AI returned invalid JSON:", text);
//       return res.status(400).json({ message: "Invalid AI response format" });
//     }

//     // 🔹 Save to Mongo
//     const newResume = await Resume.create({
//       userId,
//       title,
//       ...parsedData
//     });

//     return res.status(200).json({ resumeId: newResume._id });

//   } catch (error) {
//     console.log("GEMINI ERROR:", error);
//     return res.status(500).json({ message: "AI processing failed , abhi gemeni key is not working soon will....." });
//   }
// };
