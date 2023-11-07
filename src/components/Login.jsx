import React, { useState, useEffect } from 'react'
import paperPlane from "../static/images/paper_plane-removebg-preview-modified 1.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Login = () => {

    const cookies = new Cookies()

    const navigate = useNavigate()
    const token = cookies.get("token") && cookies.get("token").token

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
        //eslint-disable-next-line
    }, [])

    const [loginState, setLoginState] = useState(true)
    const [loginFormInput, setLoginFormInput] = useState({
        username: "",
        password: "",

    })


    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target

        setLoginFormInput({ ...loginFormInput, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoginState(false)
        const url = "http://localhost:3300/auth_login"
        // const url = "https://i4gfmcb.onrender.com/auth_login"
        try {

            axios({
                method: 'post',
                url: url,
                data: loginFormInput
            }).then(response => {
                if (response.status === 200) {
                    setLoginState(true);
                    const { data } = response
                    cookies.set("token", { token: data.token })
                    cookies.set("username", { username: data.email })
                    cookies.set("fullName", { fullName: data.fullName })
                    cookies.set("accountBal", { accountBal: data.account.accountBalance })
                    cookies.set("accountNum", { accountNum: data.account.accountNumber })
                    cookies.set("accountType", { accountType: data.account.accountType })



                    navigate('/dashboard');
                } else {
                    setLoginState(true);
                    window.alert(response.data)
                }
            }).catch(err => {

                setLoginState(true);
                window.alert(err.response.data.error)

            })
        } catch (err) {
            // This block of code will be executed if the try block throws an error.
            window.alert("Error from the server, try again later");
            setLoginState(true);
            console.log(err.message);
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