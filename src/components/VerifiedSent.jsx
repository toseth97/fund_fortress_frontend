import React, { useEffect } from 'react'
import Verify from "../static/images/Vector.png"
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const VerifiedSent = (props) => {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const token = cookies.get("token") && cookies.get("token").token

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        //eslint-disable-next-line
    }, [])

    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center relative'>

            <div className='flex flex-col  text-center items-center bg-white rounded p-4 z-10'>
                <img src={Verify} alt='mark' width={100} className='mb-4' />
                <p className='my-4 font-bold'>You funds has been transferred</p>
                <button className='py-2 px-4 bg-blue-700 text-white rounded '><a href='/dashboard'>Go back to Dashboard</a></button>
            </div>
        </section>
    )
}

export default VerifiedSent