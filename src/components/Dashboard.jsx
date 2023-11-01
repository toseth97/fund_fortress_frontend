import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CardImg from "../static/images/card_img.jpg"

const Dashboard = () => {
    const [loginState, setLoginState] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [showBal, setShowBal] = useState(false)


    useEffect(() => {
        if (cookies.get('token')) {
            // const url = "http://localhost:3300/update_dashboard"
            const url = "https://i4gfmcb.onrender.com/update_dashboard"
            setLoginState(false)
            try {
                axios(url, {
                    method: 'get',
                    headers: {
                        Authorization: `Bearer ${cookies.get('token').token}`
                    }
                }).then(response => {
                    if (response.status === 200) {
                        const { data } = response

                        cookies.set("accountBal", { accountBal: data.message })
                        setLoginState(true)
                    }
                }).catch(err => {
                    setLoginState(true)
                    alert(err.response.data.error)
                })
            } catch (err) {
                setLoginState(true)
                alert(err.message)
            }
        }

        //eslint-disable-next-line
    }, [])

    const cookies = new Cookies()
    let navigate = useNavigate();
    if (cookies.get('token') === undefined) {
        return <Link to="/login" onClick={navigate} className='bg-blue-700 px-8 py-2 rounded mt-8 text-white'><h1>You need login</h1></Link>;
    }




    const fullName = cookies.get("fullName") && cookies.get("fullName").fullName
    const accountBal = cookies.get("accountBal") && cookies.get("accountBal").accountBal
    const accountNum = cookies.get("accountNum") && cookies.get("accountNum").accountNum



    const handleToggle = () => {
        setToggle(prev => !prev)
    }

    const handleShowBal = () => {
        setShowBal(prev => !prev)
    }

    const handleLogout = async () => {
        setLoginState(false)
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
                    setLoginState(true)
                }
            }).catch(err => {
                setLoginState(true)
                window.alert(err.response.data.error)
            })
        } catch (err) {
            setLoginState(true)
            window.alert(err.message);
            console.log(err.message);
        }
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
                        {
                            loginState ? <><i className='bx bx-log-out' ></i>
                                <p>Logout</p></> : <span className='w-full flex items-center justify-center my-8'>
                                <div className='loading-bal'></div>
                            </span>
                        }
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
                        {
                            loginState ? <><i className='bx bx-log-out' ></i>
                                <p>Logout</p></> : <span className='w-full flex items-center justify-center my-8'>
                                <div className='loading-bal'></div>
                            </span>
                        }
                    </div>
                </Link>
            </div>
            <div className='grow-1 p-8 w-full'>
                {
                    loginState ? null : <span className='w-full flex items-center justify-center my-8'>
                        <div className='loading-bal'></div>
                    </span>
                }
                <div className='rounded-lg hover:shadow lg:px-8 px-2 mt-8 py-4 lg:w-4/12 w-full bg-blue-100'>
                    <div className='flex justify-between items-center '>
                        <img src={CardImg} width={60} className='card_img rounded-full' alt='avatar' />
                        <h1 className='font-bold lg:text-xl text-x'>FundFortress</h1>
                    </div>
                    <div className='flex justify-between items-center lg:my-8 my-4'>

                        <input className='bg-transparent font-bold outline-none border-none text-xl' type={showBal ? "text" : "password"} value={` ${accountBal.toLocaleString('en-US', { style: 'currency', currency: 'NGN', minimumFractionDigits: 2 })}`} readOnly />
                        <div onClick={handleShowBal} className='text-2xl'>
                            {!showBal ? <i className='bx bx-show'></i> : <i className='bx bx-low-vision'></i>}
                        </div>

                    </div>
                    <div className='flex justify-between text-sm items-center w-full'>
                        <table className='table-auto text-center w-full'>
                            <thead>
                                <tr>
                                    <th>Account Name</th>
                                    <th>Account Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fullName}</td>
                                    <td>{accountNum}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='flex justify-between text-sm items-center'>
                        <p></p>
                        <p></p>
                    </div>


                </div>

                <div className='flex lg:w-4/12 w-full lg:flex-row flex-col items-center gap-4 justify-between text-white mt-8'>
                    <Link to="/transfer" className='w-full'>
                        <div className='flex w-full text-sm hover:bg-blue-800 items-center gap-6 bg-blue-700 lg:px-4 px-3 py-2 rounded'>
                            <i className='bx bx-transfer  bg-white text-black lg:p-2 p-1 rounded-full' ></i>
                            <p className=''>Transfer Funds</p>
                        </div>
                    </Link>
                    <Link to="/add_money" className='w-full'>
                        <div className='flex text-sm w-full hover:bg-blue-800 items-center lg:gap-1 gap-6 bg-blue-700 lg:px-4 px-3 py-2 rounded'>
                            <i className='bx bx-plus bg-white text-black lg:p-2 p-1 rounded-full' ></i>
                            <p>Add Money</p>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col overflow-x-scroll lg:overflow-x-none mt-8'>
                    <h1 className='text-xl'>Transactions</h1>

                </div>
            </div>
        </section>
    )
}

export default Dashboard