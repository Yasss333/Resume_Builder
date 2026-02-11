import imageKit from "../config/imageKit.js";
import Resume from "../models/resuem.model.js";
import fs from "fs";

//POST :/api/resumes/create
export const createResumeHandler = async (req, res) => {
  //get titel , userid form middlw ware , ceate , //return respsne
  try {
    const userId = req.userId;
    const { title } = req.body;

    const resume = await Resume.create({ userId, title });
    return res
      .status(200)
      .json({ message: "Succesfully created your resume", resume: resume });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to create the resume ", error: error.message });
  }
};

//delete :/api/resume/delete

export const deleteResumehandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const deletedresume = await Resume.deleteOne({ userId, _id: resumeId });

    return res.status(200).json({ message: "Resume Deleted Succesfully " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete the resume ", error: error.message });
  }
};

//getreusme by id

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(400).json({ message: "Failed to get resume " });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return res
      .status(200)
      .json({ message: "Resume diplayed Succesfully ", resume });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to get the resume ", error: error.message });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.parmas;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res
        .status(401)
        .json({ message: "Either resume not public or no such hresume " });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Failed to get the this public resume ",
        error: error.message,
      });
  }
};

export const updateResumeHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;
    const resumecpy = JSON.parse(resumeData);

    if (image) {
      let bufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: bufferData,
        fileName: "resumes.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300 ,h-300,fo-face,z-0.75 " +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumecpy.personal_info.image = response.url;
    }

    const resume = await Resume.findByIdAndUpdate(
      { userId, _id: resumeId },
      resumecpy,
      { new: true },
    );
    return res.status(200).json({ message: "Saved Succesfully ", resume });
  } catch (error) {
    console.error("failed to update the resume ");

    return res.status(400).json({ message: "Failed to update resume ", error });
  }
};
