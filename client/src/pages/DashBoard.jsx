import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PenBoxIcon, Plus, Trash2Icon, Upload, UploadCloudIcon } from "lucide-react";

import { dummyResumeData } from "../assets/assets";

const DashBoard = () => {
  const colors = ["#d97706", "#dc2626", "#0284c7", "#9333ea", "#16a34a"];
  const [resumes, setallResumes] = useState([]);

  const loadallResumes = async () => {
    setallResumes(dummyResumeData);
  };

  useEffect(() => {
    loadallResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Yash
        </p>

        <div className="flex  gap-4">
          {/* Create Resume */}
          <button className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-3 text-slate-400 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300">
            <Plus className="size-11 p-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Existing */}
          <button className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-3 text-slate-400 border border-dashed border-slate-300 group hover:border-indigo-500  hover:shadow-lg transition-all duration-300">
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
        <hr className="border-slate-800 my-6 sm:w-[1300px]" />
        <div className="grid gird-cols-2 sm:flex flex-wrap gap-4">
          {resumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                className="flex flex-col justify-center items-center relative  w-full sm:max-w-36 h-48 rounded-lg border gap-2 hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40, )`,
                  borderColor: baseColor + `40`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p className="absolute text-[11px] bottom-1 text-slate-400 group-hover:text-slate-900 transition-all duration-300 text-center py-2" style={{color:baseColor-'40'}}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString}
                </p>
                <div className="absolute top-1 right-1 group-hover:flex items-center ">
                  <Trash2Icon className="size-7.5 p-1.5 hover:bg-black-900 rounded-text-slate-400 transition-colors"    />
                  <PenBoxIcon className="size-7.5 "/>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
