import React from 'react'
import Verify from "../static/images/Vector.png"
import paperPlane from "../static/images/paper_plane-removebg-preview-modified 1.png"

const Verified = (props) => {
    const { accountNum } = props
    console.log(props)
    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center relative'>
            <img width={900} src={paperPlane} alt='paperplane' className='absolute' />
            <div className='flex flex-col lg:w-4/12 w-10/12 text-center items-center bg-white rounded p-4 z-index-10'>
                <img src={Verify} alt='mark' width={100} className='mb-4' />
                <p className='my-4'>Yahoo!! You have successfully registered and your account is <span className='font-bold'>{accountNum}</span> </p>
                <button className='py-2 px-4 bg-blue-500 text-white '><a href='/login'>Click here to login</a></button>
            </div>
        </section>
    )
}

export default Verified