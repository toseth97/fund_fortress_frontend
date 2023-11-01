import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {


    return (
        <div className='w-full py-8 px-2 text-center'>
            <h1 className='text-4xl font-bold my-4'>The page you request for does not exist</h1>
            <p className=' mb-4'>Wanna go back home?</p>
            <Link to="/" ><h1 className='bg-blue-700 inline px-8 py-2 rounded text-white hover:bg-blue-800'>Click here</h1></Link>

        </div>
    )
}

export default Error404