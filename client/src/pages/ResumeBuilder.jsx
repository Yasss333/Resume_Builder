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
import ResumePreview from "../components/ResumePreview.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import ProffesionalSummary from "../components/ProffesionalSummary.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import Education from "../components/Education.jsx";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setresumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async (resumeId) => {
    const resume =  dummyResumeData.find(
      (resume) => resume._id === resumeId,
    );
    if (resume) {
      setresumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadExistingResume(resumeId);
    }
    console.log("resumeId:", resumeId);
    console.log("dummy data:", dummyResumeData);

  }, [resumeId]);

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
          className="inline-flex justify-center text-slate-500 gap-2 items-center hover:text-slate-800 border rounded-2xl p-2 hover:border-cyan-300  hover:bg-green-200 transition-all duration-100"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>
       {/* <div className="max-w-7xl mx-auto px-4 py-5 bg-gray-50 " >
        <Link to={"/profile"} className="inline-flex  gap-2 justify-center align-center border p-2 rounded-full text-slate-600 hover:text-amber-100 hover:border-gray-700 bg-gray-50 transition-all duration-700 shadow-xl  shadow-amber-700 hover:shadow-amber-200 hover:bg-gray-400">
        <User className="size-5"/> Go to Profile 
        </Link>
       </div> */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/*Left Panel FOrm */}
          <div className="relative lg:col-span-5 bg-white border border-gray-200 shadow-2xl  px-3 py-2 rounded-lg overflow-hidden ">
            <div className=" border-gray-200 rounded-b-lg px-1.5 pt-1"></div>
            {/* Active section using activesectionIndex */}
            <hr className="absolute    border-2 bg-amber-200 border-gray-200 top-0 left-0 right-0 " />
            <hr
              className="absolute top-0 left-0 h-1 bg-gradient-to-r  from-green-500 to-green-600 border-none
               transition-all duration-2000"
              style={{
                width: `${((activeSectionIndex+1 )/ sections.length) * 100}%`,
              }}
            />

            {/* Section Navigation */}
            <div className="flex justify-between items-center border-b border-slate-600 mb-6 py-1">
              <div className="flex gap-2">
                <TemplateSelector  selectedTemplate={resumeData.template} 
                onChange={(template)=> setresumeData(prev=>({ ...prev, template})) }/>
                <ColorPicker selectedColor={resumeData.accent_color}
                 onChange={(color)=>setresumeData(prev=>({...prev, accent_color:color}))}/>
              </div>
              <div className="flex items-center ">
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setactiveSectionIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className="flex item-center rounded-lg text-sm font-meduim text-slate-600 
                hover:bg-white-50 transition-all gap -1 p-3 }"
                    disabled={activeSectionIndex === 0}
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>
                )}
                <button
                  onClick={() =>
                    setactiveSectionIndex((prev) =>
                      Math.min(prev + 1, sections.length - 1),
                    )
                  }
                  className={`flex item-center rounded-lg text-sm font-meduim text-slate-600 
                hover:bg-white-50 transition-all gap -1 p-3
                     ${activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                  disabled={activeSectionIndex === sections.length - 1}
                >
                  <ChevronRight className="size-4" />
                  Next
                </button>
              </div>
            </div>

            {/* Form for inputs */}
            <div className="space-y-6">
              {activeSection.id === "profile" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) => {
                    setresumeData((prev) => ({ ...prev, personal_info: data }));
                  }}
                  removeBackground={removeBackgorund}
                  setremoveBackground={setremoveBackgorund}
                />
              )}
              {activeSection.id==="summary" && (
                <ProffesionalSummary
                 data={resumeData.professional_summary}
                onChange={(data)=>{
                  setresumeData( (prev) =>({...prev,professional_summary:data}))}}
                 setResumeData={resumeData}/> 
              )}
              {
                activeSection.id ==="experience" &&(
                  <ExperienceForm data={resumeData.experience}
                  onChange={(data)=>{
                    setresumeData((prev)=> ({...prev,experience:data})) 
                  }} />
                )
              }
              {
                activeSection.id ==="education" && (
                  <Education data={resumeData.education}
                  onChange={(data)=>{
                    setresumeData((prev)=>({...prev,education:data}))
                  }}
                  />
                )
              }
            </div>
          </div>
          {/*Right Panel Preview */}

          <div className="lg:col-span-7  max-lg:md-6" >
            <div>
              {/* -------BUTTON(live, share ) */}
            </div>
            {/* -------Resume Preview---------- */}
            <ResumePreview data={resumeData} template={resumeData.template} 
            accentColor={resumeData.accent_color}/>
              </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
