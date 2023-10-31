import React, { useState } from 'react'
import Cookies from 'universal-cookie'


const Header = () => {


    const cookies = new Cookies()
    const token = cookies.get("token") && cookies.get("token").token

    const [isMobile, setIsMobile] = useState(false)

    const handleIsMobile = () => {
        setIsMobile(prev => !prev)
    }

    return (



        < header className='w-full flex flex-col items-center justify-center lg:px-8 px-2 py-4 shadow sticky top-0 ' >
            <nav className='flex items-center justify-between w-11/12'>
                <h1 className='text-2xl'><a href='/'><span className='logo_bend_text text-3xl font-bold'>Fund</span> Fortress</a></h1>
                <ul className=' lg:flex hidden items-center justify-between gap-4 font-bold text-sm '>
                    <li className='p-2 mx-2 hover:text-blue-700'><a href='/'>Home</a></li>
                    <li className='p-2 mx-2 hover:text-blue-700'><a href='/'>About</a></li>
                    <li className='p-2 mx-2 hover:text-blue-700'><a href='/'>FAQ's</a></li>
                    <li className='p-2 mx-2 hover:text-blue-700'><a href='/'>Contact</a></li>
                </ul>
                {!token ? <div className='lg:flex hidden items-center justify-between'>
                    <button className='px-4 py-1 btn-secondary my-2'><a href='/login' className='w-full'>Login</a></button>
                    <button className='px-4 py-1 btn-primary my-2'><a href='/signup' className='w-full'>Sign up</a></button>
                </div> : null}
                <div className='block lg:hidden' onClick={handleIsMobile}>
                    {
                        !isMobile ? <i className='bx bx-menu text-2xl rounded border p-1 px-2'></i> : <i className='bx bx-x text-2xl rounded border p-1 px-2'></i>
                    }
                </div>
            </nav>
            {
                isMobile ? <div className='block lg:hidden w-full' >
                    <ul className=' flex flex-col items-center justify-between gap-4 font-bold text-sm '>
                        <li className='p-2 mx-2 hover:text-blue-700 w-full text-center'><a href='/'>Home</a></li>
                        <li className='p-2 mx-2 hover:text-blue-700 w-full text-center'><a href='/'>About</a></li>
                        <li className='p-2 mx-2 hover:text-blue-700 w-full text-center'><a href='/'>FAQ's</a></li>
                        <li className='p-2 mx-2 hover:text-blue-700 w-full text-center'><a href='/'>Contact</a></li>
                    </ul>
                    {!token ? <div className='flex flex-col items-center justify-between gap-2'>
                        <button className='px-4 py-1 btn-secondary  w-full'><a href='/login' className='w-full'>Login</a></button>
                        <button className='px-4 py-1 btn-primary  w-full '><a href='/signup' className='w-full'>Sign up</a></button>
                    </div> : null}
                </div > : null
            }
        </ header>
    )
}

export default Header