import React from 'react'
import {Plus} from "lucide-react"
const Education = ({data, onChange}) => {
  return (
    <div className='space-y-3'>
    <div className='flex items-center justify-between'>
      <div>
        <h3>Education</h3>
      <p>Add your education details</p>
      </div>
      <div className='flex gap-1.5'>
        < button>
            <Plus className='size-4'/>
            Add Education
        </button>
      </div>
    </div>
    </div>
  )
}

export default Education