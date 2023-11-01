import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Banks from "./Banks"

const Transfer = () => {

    const cookies = new Cookies()
    const navigate = useNavigate();
    const [accountName, setAccountName] = useState("")
    const [loginState, setLoginState] = useState(true)
    const token = cookies.get("token") && cookies.get("token").token

    const [toggle, setToggle] = useState(false)
    const [loginFormInput, setLoginFormInput] = useState({
        account: "",
        amount: "",
        description: "",
        bank: ""

    })

    const getAccountName = async (e) => {
        e.preventDefault()
        setLoginState(false)
        // const url = "http://localhost:3300/getAccount"
        const url = "https://i4gfmcb.onrender.com/getAccount"
        try {


            await axios(url, {
                method: "get",
                params: { account: loginFormInput.account },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(res => {
                setAccountName(res.data.message)
                setLoginState(true)
            }).catch(err => {
                setLoginState(true)
                window.alert(err.response.data.error)
            })



        } catch (err) {
            // This block of code will be executed if the try block throws an error.
            window.alert("Error from the server, try again later");
            setLoginState(true);
            console.log(err);
        }
    }

    const handleLogout = async () => {

        try {
            // const url = "http://localhost:3300/logout"
            const url = "https://i4gfmcb.onrender.com/logout"

            await axios(url, {
                method: "post",
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    cookies.remove("token")
                    cookies.remove("username")
                    cookies.remove("fullName")
                    cookies.remove("accountBal")
                    cookies.remove("accountNum")
                    cookies.remove("accountType")

                    navigate("/login")
                }
            }).catch(err => {
                window.alert(err.response.data.error)
            })
        } catch (err) {
            window.alert(err.message);
            console.log(err.message);
        }
    }

    const handleSendMoney = async (e) => {
        try {
            e.preventDefault()
            setLoginState(false)
            // const url = "http://localhost:3300/send_money"
            const url = "https://i4gfmcb.onrender.com/send_money"

            await axios(url, {
                method: "post",
                data: loginFormInput,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {

                setLoginState(true)
                if (res.status === 200) {

                    cookies.set("accountBal", { accountBal: res.data.balance })
                    navigate("/verifySent")
                }
            }).catch(err => {
                setLoginState(true)
                window.alert(err.response.data.error)
            })

        } catch (err) {
            window.alert(err.message);
            setLoginState(true);
            console.log(err);
        }
    }


    if (cookies.get('token') === undefined) {
        return <Link to="/login" onClick={navigate} className='bg-blue-700 px-8 py-2 rounded mt-8 text-white'><h1>You need login</h1></Link>;
    }




    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target

        setLoginFormInput({ ...loginFormInput, [name]: value })
    }
    const handleToggle = () => {
        setToggle(prev => !prev)
    }





    return (
        <section className='w-full flex gap-8  relative overflow-hidden '>
            <div onClick={handleToggle} className='lg:hidden block bg-blue-700 showBtn text-2xl text-white rounded-full p-2 absolute left-4 top-2 flex justify-center items-center transition-all ease-in-out delay-150  hover:bg-blue-800'>
                {toggle ? <i className='bx bxs-chevrons-left'></i> : <i className='bx bxs-chevrons-right'></i>}
            </div>
            <div className={`lg:hidden ${toggle ? "flex" : "hidden"} flex-col bg-white border-r grow-0 py-8`}>
                <Link to="/dashboard">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-home'></i>
                        <p>Home</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-credit-card' ></i>
                        <p>Cards</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-briefcase' ></i>
                        <p>Manage</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-dollar-circle' ></i>
                        <p>Loan</p>
                    </div>
                </Link>
                <Link onClick={handleLogout}>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-log-out' ></i>
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
            <div className=' lg:flex hidden flex-col border-r grow-0 bg-white py-8'>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-home'></i>
                        <p>Home</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-credit-card' ></i>
                        <p>Cards</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-briefcase' ></i>
                        <p>Manage</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-dollar-circle' ></i>
                        <p>Loan</p>
                    </div>
                </Link>
                <Link>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-log-out' ></i>
                        <p>Logout</p>
                    </div>
                </Link>
            </div>
            <div className='grow-1 p-8 w-full'>
                <div className='rounded-lg hover:shadow px-8 mt-8 py-4 lg:w-4/12 w-full bg-blue-700'>
                    <h1 className='text-white text-center text-xl font-bold my-4'>Transfer Funds</h1>
                    <form onSubmit={handleSendMoney}>

                        <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="account">Account Number</label>
                            <select className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' name='bank' id='bank'>
                                {
                                    Banks.map(item => <option value={item.name} name="bank" key={item.name} >{item.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="account">Account Number</label>
                            <input type='number' id='account' name='account' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' onChange={handleInputChange} />
                        </div>

                        {

                            accountName ?

                                <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 pointer '>
                                    <p className='my-4 text-white cursor-pointer'>Account name: {accountName}</p>
                                </div>
                                : null
                        }
                        {
                            accountName ? <>
                                <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                                    <label className='text-sm text-white' htmlFor="amount">Amount</label>
                                    <input type='number' id='amount' name='amount' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' onChange={handleInputChange} />
                                </div>
                                <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 '>
                                    <label className='text-sm text-white' htmlFor="description">Description</label>
                                    <input type='text' id='description' name='description' className='rounded active:shadow focus:shadow px-4 py-2 border outline-none' onChange={handleInputChange} />
                                </div>
                                <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 ' onClick={handleSendMoney}>
                                    <button className='mt-4 text-center text-white bg-black rounded py-2' type='submit'>{loginState ? "Send Money" :
                                        <span span className='w-full flex items-center justify-center'>
                                            <div className='loading'></div>
                                        </span>
                                    }</button></div>

                            </> : null
                        }

                    </form>
                    {

                        !accountName ? <div className='flex flex-col lg:gap:4 gap:2 lg:px-8 px-2 mt-4 ' onClick={getAccountName}>
                            <div className='mt-4 text-center text-white bg-black rounded py-2'>{loginState ? "Confirm Account Name" :
                                <span span className='w-full flex items-center justify-center'>
                                    <div className='loading'></div>
                                </span>
                            }</div></div> : null

                    }
                </div>
            </div >
        </section >
    )
}

export default Transfer