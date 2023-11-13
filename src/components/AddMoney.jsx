import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CardImg from "../static/images/emv_chip-removebg-preview (1).png"
import VisaCard from "../static/images/visa_card_logo-removebg-preview.png"
import MasterCard from "../static/images/mastercard_logo-removebg-preview.png"

const AddMoney = () => {
    const [loginState, setLoginState] = useState(true)
    const [loadOTP, setLoadOTP] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [getOTP, setOtp] = useState("")
    const [confirmOTP, setConfirmOTP] = useState(false)

    const CARDNUMBER = "CARDNUMBER"
    const CARDPIN = "CARDPIN"
    const CARDMONTH = "CARDMONTH"
    const CARDYEAR = "CARDYEAR"
    const CARDCVV = "CARDCVV"
    const AMOUNT = "CAMOUNT"

    const reducer = (state, action) => {
        switch (action.type) {
            case AMOUNT:
                return { ...state, amount: action.payload }
            case CARDNUMBER:
                return { ...state, cardnumber: action.payload }
            case CARDPIN:
                return { ...state, pin: action.payload }
            case CARDMONTH:
                return { ...state, cardmonth: action.payload }
            case CARDYEAR:
                return { ...state, cardyear: action.payload }
            case CARDCVV:
                return { ...state, cvv: action.payload }
            default:
                throw new Error('Invalid Action Type');
        }

    }

    const verifyCardDetails = () => {
        const currentDate = new Date()


        if (state.cardnumber.length < 16) {
            alert("Invalid card number")
            return
        } else if ((Number(state.cardmonth) < 1 || Number(state.cardmonth) > 12)) {
            alert("Card Expiry month invalid ")
            return
        } else if ((Number(state.cardyear) < Number(currentDate.getFullYear()))) {
            alert("Card Expired")
            return
        }
    }
    const cookies = new Cookies()

    const [state, dispatch] = useReducer(reducer, {
        cardnumber: "",
        cardmonth: "",
        cardyear: "",
        cvv: "",
        pin: "",
        amount: "",
        accountNumber: cookies.get("accountNum").accountNum
    })

    let navigate = useNavigate();

    const token = cookies.get("token") && cookies.get("token").token



    const handleToggle = () => {
        setToggle(prev => !prev)
    }


    const getOtp = async () => {
        // const url = "http://localhost:3300/sendotp"
        const url = "https://i4gfmcb.onrender.com/sendotp"
        setLoadOTP(false)
        verifyCardDetails()
        try {
            await axios(url, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(res => {
                setConfirmOTP(true)
                if (res.status === 200) {
                    setConfirmOTP(true)
                    setLoadOTP(true)
                }
            }).catch(err => {
                setLoadOTP(true)

                window.alert(err.response.data.error)
            })
        } catch (err) {
            setLoadOTP(true)
            console.log(err.message)
        }
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


    const handleAmountChange = (event, type) => {
        const action = {
            type: type,
            payload: event.target.value,
        };

        if (/^[0-9]*$/.test(action.payload)) {
            dispatch(action)

        }


    }

    const handleCardNumberChange = (event, type) => {

        const action = {
            type: type,
            payload: event.target.value,
        };
        // Allow only numeric input
        if (/^[0-9]*$/.test(action.payload) && action.payload.length <= 16) {
            dispatch(action)

        }

    };
    const handleExpirationDateChange = (event, type) => {
        const action = {
            type: type,
            payload: event.target.value,
        };
        // Allow only numeric input for MM/YY format
        if (/^[0-9]*$/.test(action.payload) && action.payload.length <= 2) {
            dispatch(action)
        }
    };
    const handleExpirationYearChange = (event, type) => {
        const action = {
            type: type,
            payload: event.target.value,
        };
        // Allow only numeric input for MM/YY format
        if (/^[0-9]*$/.test(action.payload) && action.payload.length <= 4) {
            dispatch(action)
        }
    };
    const handleCvvChange = (event, type) => {
        const action = {
            type: type,
            payload: event.target.value,
        };
        // Allow only numeric input for MM/YY format
        if (/^[0-9]*$/.test(action.payload) && action.payload.length <= 3) {
            dispatch(action)
        }
    };
    const handlePinChange = (event, type) => {
        const action = {
            type: type,
            payload: event.target.value,
        };
        // Allow only numeric input for MM/YY format
        if (/^[0-9]*$/.test(action.payload) && action.payload.length <= 4) {
            dispatch(action)
        }
    };

    const handleOTP = (event) => {
        const input = event.target.value
        if (/^[0-9]*$/.test(input) && input.length <= 6) {
            setOtp(input)
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setLoadOTP(false)
        verifyCardDetails()
        // const url = "http://localhost:3300/sendotp"
        const url = "https://i4gfmcb.onrender.com/sendotp"
        try {


            await axios(url, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify()
            }).then(response => {
                if (response.status === 200) {
                    setLoadOTP(true)
                    navigate("/verifiedAdd")
                }
            }).catch(err => {
                setLoadOTP(true)
                window.alert(err.response.data.error)
            })


        } catch (err) {
            setLoadOTP(true)
            alert(err.message)
            console.log(err.message)
        }
    }

    const accountNumber = cookies.get("accountNum").accountNum



    if (cookies.get('token') === undefined) {
        return <Link to="/login" onClick={navigate} className='bg-blue-700 px-8 py-2 rounded mt-8 text-white'><h1>You need login</h1></Link>;
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
                <div className='rounded-lg hover:shadow lg:px-8 px-2 mt-8 py-4 lg:w-4/12 w-full bg-blue-100'>

                    <div className='flex justify-between items-center '>
                        <img src={CardImg} width={60} className='card_img rounded-full' alt='avatar' />
                        <p>Debit Card</p>
                    </div>
                    <p className='py-1 mt-4 h-10'>{state.cardnumber.split('').map((char, index) => {
                        // Add a space after every fourth character
                        return (index + 1) % 4 === 0 ? char + ' ' : char;
                    }).join('')} </p>
                    <div className='flex justify-between text-sm items-center w-full'>

                        <p className='text-sm'>Expiry Date : {state.cardmonth} / {state.cardyear}</p>

                        {
                            state.cardnumber ? <img src={state.cardnumber[0] === "5" ? MasterCard : VisaCard} width={70} className='card_img rounded-full' alt='avatar' /> : null
                        }

                    </div>
                </div>

                <div className='rounded-lg hover:shadow px-2 mt-8 py-4 lg:w-4/12 w-full bg-blue-700'>
                    <h1 className='text-white text-center text-xl font-bold my-4'>Add Funds</h1>


                    <form className='text-blue-500' onSubmit={handleFormSubmit}>
                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="amount">Amount</label>
                            <input id="amount" type='number' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required onChange={(event) => handleAmountChange(event, AMOUNT)} value={state.amount} name='amount' />
                        </div>
                        <input type='hidden' value={accountNumber} />

                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="cardNumber">cardNumber</label>
                            <input id="cardNumber" type='text' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required inputMode="numeric" pattern="[0-9]*" maxLength="16" onChange={(event) => handleCardNumberChange(event, CARDNUMBER)} value={state.cardnumber} />
                        </div>

                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="account">Expiry Date</label>
                            <div className='flex lg:gap-8 gap-2'>
                                <input type="text" id="debit-card-expiry-date-month" placeholder="MM" maxLength="2" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required min="1" max="12" name='exp-month' onChange={(event) => handleExpirationDateChange(event, CARDMONTH)} value={state.cardmonth} />
                                <input type="text" id="debit-card-expiry-date-year" placeholder="YYYY" maxLength="4" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required name='exp-year' onChange={(event) => handleExpirationYearChange(event, CARDYEAR)} value={state.cardyear} />
                                <input type="text" id="debit-card-cvv" placeholder="CVV" maxLength="3" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required name='cvv' onChange={(event) => handleCvvChange(event, CARDCVV)} value={state.cvv} />
                            </div>

                        </div>
                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="cardPin">PIN</label>
                            <input id="cardPin" type='password' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required maxLength="4" onChange={(event) => handlePinChange(event, CARDPIN)} value={state.pin} />
                        </div>
                        {
                            confirmOTP ? <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                                <label className='text-sm text-white' htmlFor="otp">OTP</label>
                                <input id="otp" type='text' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required maxLength="6" onChange={handleOTP} value={getOTP} name='myOtp' />
                            </div> : null
                        }

                        {
                            confirmOTP ? <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                                <button className='w-full hover:bg-slate-200 bg-slate-300 text-center py-1 rounded text-blue-500'>{
                                    loadOTP ? "Continue" : <span className='w-full flex items-center justify-center'>
                                        <div className='loading'></div>
                                    </span>
                                }</button>
                            </div> : <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                                <p className='w-full hover:bg-slate-200 bg-slate-300 text-center py-1 rounded text-blue-500 cursor-pointer' onClick={getOtp}>{
                                    loadOTP ? "Get OTP" : <span className='w-full flex items-center justify-center'>
                                        <div className='loading'></div>
                                    </span>
                                }</p>
                            </div>
                        }

                        {

                        }




                    </form>

                </div>
            </div>
        </section>
    )
}

export default AddMoney