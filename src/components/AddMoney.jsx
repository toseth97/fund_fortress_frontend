import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CardImg from "../static/images/card_img.jpg"

const AddMoney = () => {
    const [loginState, setLoginState] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [showBal, setShowBal] = useState(false)


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
                <Link to="/virtual_card">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-credit-card' ></i>
                        <p>Cards</p>
                    </div>
                </Link>
                {/* {<Link to="/manage">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-briefcase' ></i>
                        <p>Manage</p>
                    </div>
                </Link>
                <Link to="/loan">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-dollar-circle' ></i>
                        <p>Loan</p>
                    </div>
                </Link>} */}
                <Link onClick={handleLogout}>

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-log-out' ></i>
                        <p>{
                            loginState ? "Logout" : <span className='w-full flex items-center justify-center my-8'>
                                <div className='loading-bal'></div>
                            </span>
                        }</p>
                    </div>
                </Link>
            </div>
            <div className=' lg:flex hidden flex-col border-r grow-0 bg-white py-8'>
                <Link to="/dashboard">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-home'></i>
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="/virtual_card">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-credit-card' ></i>
                        <p>Cards</p>
                    </div>
                </Link>
                {/* {<Link to="/manage">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-briefcase' ></i>
                        <p>Manage</p>
                    </div>
                </Link>
                <Link to="/loan">

                    <div className='flex gap-2 items-center px-8 py-2 my-4 '>
                        <i className='bx bx-dollar-circle' ></i>
                        <p>Loan</p>
                    </div>
                </Link>} */}
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

            </div>
        </section>
    )
}

export default AddMoney