import { Plus } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({data, onChange}) => {
  
    const addExperience=()=>{
        const newExperience={
            company:"",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false    
        }
        onChange([...data, newExperience]); 
    }

    const removeExperince=(index)=>{
      const updated=data.filter(_,i)
    }
  
    return (
    <div className='space-y-6'>
      <div className='flex justify-between  items-center '>
            <div className=''>
               <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Enter Experience</h3>
            </div>
            <button className='inline-flex items-center px-3  py-1 gap-2  bg-purple-200 text-purple-600 rounded
            text-sm hover:bg-purple-300 border border-transparent    hover:border-purple-900 transition-colors disabled:opcaity-50 disabled:cursor-not-allowed'>

                Add Exp
                <Plus className='size-4 '/>
            </button>
        </div>
            <div className='mt-6'>
                <textarea value={data ||""} onChange={(e)=>onChange(e.target.value)} rows={7} className='w-full
                 p-4 px-4 mt-2 border text-sm 
                border-gray-300 rounded-lg focus:ring focus:ring-blue-500    outline-none
                transition-colors resize-none' placeholder='Write a compleelling proffesional summary '/>
                <p className='tetx-xs text-center text-slate-800 max-w-4/5'><span className='text-gray-900 font-semibold'>Tip :</span>Please keep it concise </p>
            </div>
    </div>
  )
}

export default ExperienceForm