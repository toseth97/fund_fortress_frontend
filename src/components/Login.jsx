import React, { useState } from 'react'
import paperPlane from "../static/images/paper_plane-removebg-preview-modified 1.png"
import { useNavigate } from 'react-router-dom'

const Login = () => {


    const navigate = useNavigate()

    const [loginState, setLoginState] = useState(true)
    const [signupFormInput, setSignupFormInput] = useState({
        username: "",
        password: "",

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
        const url = "https://i4gfmcb.onrender.com/auth_login"
        console.log("2")
        try {
            console.log("1")
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(signupFormInput)
                //credentials: true

            }).then(response => {
                console.log(response)
                response.json()
            }).then(data => {
                console.log("3")
                setLoginState(true)
                console.log(data)
                if (data.error) {
                    alert(data.error)
                }
                if (data.user) {
                    navigate("/dashboard")
                }
            });

        } catch (err) {

            window.alert("Error from the server, try again later")
            setLoginState(true)
            console.log(err.message)
        }
    }
    return (
        <section className='w-full bg-blue-700 flex flex-col items-center justify-center relative'>
            <img width={900} src={paperPlane} alt='paperplane' className='absolute' />
            <div className='glassBackground p-4 w-10/12 lg:w-4/12  rounded py-4 '>
                <h1 className='text-blue-700 mb-4 text-center font-bold text-xl mb-4'>Log in to your account</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="username">Email</label>
                        <input type='text' id='username' name='username' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4'>
                        <label className='text-sm' htmlFor="password">password</label>
                        <input type='password' id='password' name='password' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                        <div className='bg-blue-700 rounded text-white text-center'><button type='submit' className=' px-8 py-2 bg-blue-700 rounded'>{
                            loginState ? "Confirm" : <span className='w-full flex items-center justify-center'>
                                <div className='loading'></div>
                            </span>
                        }</button></div>
                    </div>
                </form>

            </div>
            <a href='/signup' className='my-4 text-sm text-white'>You don't have an account? Sign up</a>
        </section>
    )
}

export default Login