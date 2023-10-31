import React, { useState, useEffect } from 'react'
import paperPlane from "../static/images/paper_plane-removebg-preview-modified 1.png"
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const SignUp = (props) => {

    const { setAccountNum } = props
    const navigate = useNavigate()
    const cookies = new Cookies()
    const token = cookies.get("token") && cookies.get("token").token

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
        //eslint-disable-next-line
    }, [])

    const [loginState, setLoginState] = useState(true)
    const [signupFormInput, setSignupFormInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
        confirm_password: "",
        phoneNo: ""

    })

    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target

        setSignupFormInput({ ...signupFormInput, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoginState(false)
        //const url = "http://localhost:5000/signup"
        const url = "https://i4gfmcb.onrender.com/signup"
        try {

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupFormInput)
                //credentials: true
            }).then(response => response.json()).then(data => {
                setLoginState(true)

                if (data.error) {
                    alert(data.error)
                }
                if (data.user) {

                    setAccountNum(data.accountnumber)
                    navigate("/verified")
                }
            });

        } catch (err) {

            window.alert("Error from the server, try again later")
            setLoginState(true)
            console.log(err.message)
        }
    }







    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center  relative'>
            <img width={900} src={paperPlane} alt='paperplane' className='absolute' />
            <div className='glassBackground p-4 w-10/12 lg:w-4/12  rounded py-4 '>
                <h1 className='text-blue-700 mb-4 text-center font-bold text-xl mb-4'>Create an account with us</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="firstName">First Name</label>
                        <input onChange={handleInputChange} value={signupFormInput.firstName} required type='text' id='firstName' name='firstName' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="lastName">Last Name</label>
                        <input onChange={handleInputChange} value={signupFormInput.lastName} required type='text' id='lastName' name='lastName' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="email">Email</label>
                        <input onChange={handleInputChange} value={signupFormInput.email} required type='email' id='email' name='email' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="DOB">Date of Birth</label>
                        <input onChange={handleInputChange} value={signupFormInput.dob} required type='date' id='DOB' name='dob' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="phoneNo">Phone No</label>
                        <input onChange={handleInputChange} value={signupFormInput.phoneNo} required type='text' id='phoneNo' name='phoneNo' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="password">Password</label>
                        <input onChange={handleInputChange} value={signupFormInput.password} required type='password' id='password' name='password' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="confirm_password">Confirm Password</label>
                        <input onChange={handleInputChange} value={signupFormInput.confirmPassword} required type='password' id='confirm_password' name='confirm_password' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' />
                    </div>

                    <button type='submit' className=' px-8 py-2 bg-blue-700 rounded w-full my-4 text-white'>
                        {
                            loginState ? "Signup" : <span className='w-full flex items-center justify-center'>
                                <div className='loading'></div>
                            </span>
                        }
                    </button>

                </form>

            </div>
            <a href='/login' className='my-4 text-sm text-white'>Already have an account? Log in</a>
        </section>
    )
}

export default SignUp