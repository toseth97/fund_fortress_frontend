import React from 'react'
import Carousel from './Carosel'
import Typewriter from "typewriter-effect";

const Home = () => {

    return (
        <section className='flex flex-col items-center justify-center w-11/12 lg:py-8 lg:mt-8 py-4'>
            <div className='flex lg:flex-row flex-col w-11/12 items-start justify-between gap-4'>
                <div>
                    <h1 className='lg:text-6xl text-4xl font-bold'>
                        The best way to <span className='text-yellow-500'>save</span> & Manage <span className='text-green-500'>finances</span> for {
                            <Typewriter className="inline"
                                style={{ "display": "inline" }}
                                options={{
                                    strings: ['yourself.', 'your children.'],
                                    autoStart: true,
                                    loop: true,

                                }}

                            />
                        }
                    </h1>
                    <p className='my-4 lg:text-xl text-normal text-justify'>Welcome to <span></span> platform! We are trilled that you have chosen to explore the world of banking with us.</p>
                    <p className='my-4 lg:text-xl text-normal text-justify'>We believe that everyone should have the opportunity to save and grow their wealth</p>

                    <button className='btn-primary py-1 px-4'>Get Started</button>
                </div>
                <div className='w-full'>
                    <Carousel />
                </div>
            </div>



        </section >
    )
}

export default Home