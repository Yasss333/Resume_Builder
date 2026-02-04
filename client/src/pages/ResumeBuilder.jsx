import React, { useEffect, useState } from "react";
import { useParams, Link, useAsyncError } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  AppWindow,
  ArrowLeft,
  ArrowLeftIcon,
  Briefcase,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkle,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm.jsx";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setresumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    proffesional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (resumeId) => {
    const resume = await dummyResumeData.find(
      (resume) => resume._id === resumeId,
    );
    if (resume) {
      setresumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, []);

  const [activeSectionIndex, setactiveSectionIndex] = useState(0);
  const [removeBackgorund, setremoveBackgorund] = useState(false);

  const sections = [
    { id: "profile", name: "Profile Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

 

  return (
    <div>
      <div className="max-w-7xl   mx-auto py-6 px-4">
        <Link
          to={"/app"}
          className="inline-flex justify-center text-slate-500 gap-2 items-center hover:text-slate-800 border rounded-2xl p-2 hover:border-cyan-300  hover:bg-amber-200 transition-all duration-100"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/*Left Panel FOrm */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden ">
            <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm p-6 pt-1"></div>
            {/* Active section using activesectionIndex */}
            <hr className="absolute margin border-2 border-gray-200 top-0 left-0 right-0 " />
            <hr className="absolute top-0 left-0 h-1 bg-gradient-r from-green-500 to-green-600 border-none transition-all duration-2000" 
            style={{width:`${activeSectionIndex * 100}/{sections.length-1}%`}} />
  
          {/* Section Navigation */}
          <div className="flex justify-between items-center border-b border-slate-600 mb-6 py-1">

            <div className=""></div>
            <div className="flex items-center ">
              {activeSectionIndex!==0 && (
                <button onClick={()=>setactiveSectionIndex((prev)=>Math.max(prev-1,0))} className="flex item-center rounded-lg text-sm font-meduim text-slate-600 
                hover:bg-white-50 transition-all gap -1 p-3 }" disabled={activeSectionIndex===0}>
                  <ChevronLeft className="size-4"/>Previous
                </button>
              )}
                <button onClick={()=>setactiveSectionIndex((prev)=>Math.min(prev+1,sections.length-1))} 
                className={`flex item-center rounded-lg text-sm font-meduim text-slate-600 
                hover:bg-white-50 transition-all gap -1 p-3   ${activeSectionIndex===sections.length-1 && 'opacity-50'}`} disabled={activeSectionIndex===sections.length-1 }>
                  <ChevronRight className="size-4"/>Next
                </button>
            </div>
          </div>
            
            {/* Form for inputs */}
            <div className="space-y-6">
              {activeSection.id==='profile' && (
                <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>{
                  setresumeData(prev=>({...prev, personal_info:data
                  }))
                }}   removeBackground={removeBackgorund} 
                setremoveBackground={setremoveBackgorund}/> 
              )}
            </div>
          </div>
          {/*Right Panel Preview */}
          <div></div>
        </div>
      </div>
    </div>

  );
};

export default ResumeBuilder;
