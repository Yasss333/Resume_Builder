import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PenBoxIcon, Plus, Trash2Icon, Upload, UploadCloudIcon, XIcon } from "lucide-react";

import api from '../../configs/api';
import {Navigate, useNavigate} from "react-router-dom"
import { dummyResumeData } from "../assets/assets";
import {useSelector} from "react-redux"
import toast from "react-hot-toast";

const DashBoard = () => {

  const {user,token}=useSelector(state=>state.auth) ;

  const colors = ["#d97706", "#dc2626", "#0284c7", "#9333ea", "#16a34a"];
  const [resumes, setallResumes] = useState([]);
  const[createresume , setcreateResume]=useState(false)
  const[uploadresume , setuploadresume]=useState(false)
  const[title, settitle]= useState('')
  const[resume, setresume]= useState(null)
  const[editresumeId, setEditResumeId]= useState('')
  
  const navigate=useNavigate();

  const loadallResumes = async () => {
    setallResumes(dummyResumeData);
  };

  useEffect(() => {
    loadallResumes();
  }, []);

  const createResume=async(e)=>{
    try {
       e.preventDefault();
      const {data}= await api.post('/api/resumes/create',{title},{
        headers:{Authorization:`Bearer ${token}`}
      })
      setallResumes([...resumes,data.resume])
      settitle('')
      setcreateResume(false)
      navigate('/app/builder/data.resume._id')
     } catch (error) {
      toast.error(error?.response?.data?.message|| error.message)
     }
    //  setcreateResume(true);
    //  navigate(`/app/builder/res123`)
     
  }
   
  const uploadResume=async(e)=>{
    e.preventDefault();
    setuploadresume(false);
    navigate(`app/builder/res123`)
  }
  const editTitle=async(e)=>{
    e.preventDefault();
  }

  const deleteResume=async(resumeId)=>{
    const confirm=window.confirm("Are You sure you want to delete this resume ?")
    setallResumes(prev=>prev.filter(resume=>resume._id!==resumeId));
  }
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Yash
        </p>

        <div className="flex  gap-4">
          {/* Create Resume */}
          <button onClick={()=>{
            setcreateResume(true)
          }} className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-3 text-slate-400 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300">
            <Plus className="size-11 p-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Existing */}
          <button onClick={()=>{ setuploadresume(true)}} className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-3 text-slate-400 border border-dashed border-slate-300 group hover:border-indigo-500  hover:shadow-lg transition-all duration-300">
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-r from-indigo-200 to-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-400 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
        <hr className="border-slate-800 my-6 sm:w-[1300px]" />


        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {resumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              
              <button
                key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)}
                className="group flex flex-col justify-center items-center relative  w-full sm:max-w-36 h-48 rounded-lg border gap-2 hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40 )`,
                  borderColor: baseColor + `40`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all "
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p className="absolute text-[12px] bottom-1 text-slate-600 group-hover:text-slate-950 transition-all duration-300 text-center py-2" style={{color:baseColor+  '40'}}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={e=>e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden  ">
                  <Trash2Icon onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white rounded text-slate-700 transition-colors"    />
                  <PenBoxIcon onClick={()=>{setEditResumeId(resume._id);settitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50  transition-colors rounded text-slate-700   "/>
                </div>
              </button>
            );
          })}
        </div>

        {
          createresume && 
          <form onSubmit={createResume} onClick={()=>{setcreateResume(false)}} className="fixed inset-0 z-10 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center">
            <div onClick={e=>e.stopPropagation()} className="absolute border p-6 w-full max-w-sm bg-slate-50 shadow-md rounded-lg ">
              <h2 className="text-xl mb-4 font-bold">Create Resume</h2>
              <input onChange={(e)=>{e.target.value ; settitle(e.target.value)}} value={title} type="text" placeholder="Enter Resume" className="w-full py-2 px-4 mb-3   focus:border-green-500  ring-green-500" required/>
            <button className="w-full py-4 bg-green-500 text-white hover:bg-green-700 rounded transition-colors">Create Resume</button>
            <XIcon className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors" onClick={()=>{
              setcreateResume(false);settitle('')
            }}/>
            </div>
          </form>
        }
        {
          uploadresume && 
          <form onSubmit={uploadResume} onClick={()=>{setuploadresume(false)}} className="fixed inset-0 z-10 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center">
            <div onClick={e=>e.stopPropagation()} className="absolute border p-6 w-full max-w-sm bg-slate-50 shadow-md rounded-lg ">
              <h2 className="text-xl mb-4 font-bold">Upload Resume</h2>
              <input type="text"  onChange={(e)=>{e.target.value;settitle(e.target.value)}} value={title} placeholder="Enter Resume" className="w-full py-2 px-3  mb-3   focus:border-green-500  ring-green-500" required/>
            
          <div>
            <label htmlFor="resume-input" className="block text-sm text-slate-700  ">Select Resume File
  
          <div className="flex flex-col justify-center items-center border border-dashed border-slate-700 p-4 py-10 hover:border-green-500 rounded-md 
             text-slate-400 my-4 gap-2 hover:text-green-400 cursor-pointer transition-colors">
            { resume ? (
              <p className="text-green-400">{resume.name} </p>
            ):(
              <>
              <UploadCloudIcon className="size-14 strike-1"/>
              <p>Upload Resume</p>
              </>
            )
              
            }
          </div>

            </label>
            <input type="file" id='resume-input' accept=".pdf" hidden onChange={(e)=>setresume(e.target.files[0])} />
          </div>

            <button className="w-full py-4 bg-green-500 text-white hover:bg-green-700 rounded transition-colors">Upload Resume </button>
            <XIcon className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors" onClick={()=>{
              setuploadresume(false);settitle('')
            }}/>
            </div>
          </form>
        }


        {
          editresumeId && 
          <form onSubmit={editTitle} onClick={()=>{setEditResumeId('')}} className="fixed inset-0 z-10 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center">
            <div onClick={e=>e.stopPropagation()} className="absolute border p-6 w-full max-w-sm bg-slate-50 shadow-md rounded-lg ">
              <h2 className="text-xl mb-4 font-bold">Edit  Resume Title </h2>
              <input onChange={(e)=>{ settitle(e.target.value)}} value={title} type="text" placeholder="Enter Resume" className="w-full py-2 px-4 mb-3   focus:border-green-500  ring-green-500" required/>
            <button className="w-full py-4 bg-green-500 text-white hover:bg-green-700 rounded transition-colors">Update Resume</button>
            <XIcon className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors" onClick={()=>{
              setEditResumeId('');settitle('')
            }}/>
            </div>
          </form>
        }
      </div>
    </div>
  );
};

export default DashBoard;
