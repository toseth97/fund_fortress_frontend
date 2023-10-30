import React from 'react'
import paperPlane from "../static/images/paper_plane-removebg-preview-modified 1.png"

const SignUp = () => {
    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center  relative'>
            <img width={900} src={paperPlane} alt='paperplane' className='absolute' />
            <div className='glassBackground p-4 w-10/12 lg:w-4/12  rounded py-4 '>
                <h1 className='text-blue-700 mb-4 text-center font-bold text-xl mb-4'>Create an account with us</h1>
                <form>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' for="firstName">First Name</label>
                        <input type='text' id='firstName' name='firstName' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' for="lastName">Last Name</label>
                        <input type='text' id='lastName' name='lastName' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' for="email">Email</label>
                        <input type='email' id='email' name='email' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' for="DOB">Date of Birth</label>
                        <input type='date' id='DOB' name='DOB' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' for="phoneNo">Phone No</label>
                        <input type='text' id='phoneNo' name='phone' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                        <div className='bg-blue-700 rounded text-white text-center'><button type='submit' className=' px-8 py-2 bg-blue-700 rounded'>Sign Up</button></div>
                    </div>
                </form>

            </div>
            <a href='/login' className='my-4 text-sm text-white'>Already have an account? Log in</a>
        </section>
    )
}

export default SignUp