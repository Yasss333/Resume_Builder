import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const user={name:"Yash"};
    const navigate=useNavigate();
  
    const logoutUser=()=>{
        navigate('/')
    }
  return (
    <div className='shadow bg-white-100'>
     <nav className='flex items-center  justify-between max-w-7xl mx-auto px-3 py-3.5 text-slate-800 transition-all'>
      <Link to='/'>
      <img src="./logo.svg" alt="" className='h-11 w-auto' />
       </Link>
       <div className='flex items-center gap-4 text-sm' >
     <p className='max-sm:hidden'>Hi , {user?.name}</p>
        < button onClick={logoutUser} className='bg-white hover:bg-slate-100 border-2 border-grey-300 px-7 py-2 rounded-full active:scale-95 '> Logout</button>
       </div>
     </nav>

    </div>
  )
}

export default Navbar