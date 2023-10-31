import React, { useEffect } from 'react'
import Verify from "../static/images/Vector.png"
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'

const Verified = (props) => {

    const cookies = new Cookies()
    const navigate = useNavigate()
    const token = cookies.get("token") && cookies.get("token").token

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
        //eslint-disable-next-line
    }, [])

    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center relative'>

            <div className='flex flex-col  text-center items-center bg-white rounded p-4 z-10'>
                <img src={Verify} alt='mark' width={100} className='mb-4' />
                <p className='my-4 font-bold'>Yahoo!!! You have successfully registered</p>
                <button className='py-2 px-4 bg-blue-700 text-white rounded '><a href='/login'>Click here to login</a></button>
            </div>
        </section>
    )
}

export default Verified