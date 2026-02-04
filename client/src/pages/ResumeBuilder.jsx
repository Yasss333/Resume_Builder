import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";

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

  return (
    <div>
      <div className="max-w-7xl   mx-auto py-6 px-4">
        <Link to={'/app'} className="inline-flex justify-center text-slate-500 gap-2 items-center hover:text-slate-800 border rounded-2xl p-2 hover:border-cyan-300  hover:bg-amber-200 transition-all duration-100" >          
          <ArrowLeftIcon className="size-4" />Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/*Left Panel FOrm */}
          <div>

          </div>
          {/*Right Panel Preview */}
           
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
