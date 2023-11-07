import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CardImg from "../static/images/emv_chip-removebg-preview (1).png"

const AddMoney = () => {
    const [loginState, setLoginState] = useState(true)
    const [toggle, setToggle] = useState(false)
    const [showBal, setShowBal] = useState(false)

    const CARDNUMBER = "CARDNUMBER"
    const CARDPIN = "CARDPIN"
    const CARDMONTH = "CARDMONTH"
    const CARDYEAR = "CARDYEAR"
    const CARDCVV = "CARDCVV"

    const reducer = (state, action) => {
        switch (action.type) {
            case CARDNUMBER:
                return { ...state, cardnumber: action.payload }
            case CARDPIN:
                return { ...state, pin: action.payload }
            case CARDMONTH:
                return { ...state, month: action.payload }
            case CARDYEAR:
                return { ...state, year: action.payload }
            case CARDCVV:
                return { ...state, cvv: action.payload }
            default:
                throw new Error('Invalid Action Type');
        }

    }

    const [state, dispatch] = useReducer(reducer, {
        cardnumber: "",
        cardmonth: "",
        cardyear: "",
        cvv: "",
        pin: ""
    })

    const cookies = new Cookies()
    let navigate = useNavigate();











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


    const handleChange = (event, type) => {

        const action = {
            type: type,
            payload: event.target.value,
        };

        console.log(state.cardnumber.length)





        if (type === CARDNUMBER) {
            if (state.cardnumber.length < 18) {
                dispatch(action)
            }
        } else {
            dispatch(action)
        }

    }

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
                <div className='rounded-lg hover:shadow lg:px-8 px-2 mt-8 py-4 lg:w-3/12 w-full bg-blue-100'>

                    <div className='flex justify-between items-center '>
                        <img src={CardImg} width={60} className='card_img rounded-full' alt='avatar' />
                        <p>Debit Card</p>
                    </div>
                    <p className='px-8 py-1 mt-4 h-10'>{state.cardnumber}</p>
                    <div className='flex justify-between text-sm items-center w-full'>

                        <p className='text-sm'>Expiry Date : {state.cardmonth} / {state.cardyear}</p>
                        <img src="" width={40} className='card_img rounded-full' alt='avatar' />

                    </div>
                </div>

                <div className='rounded-lg hover:shadow px-2 mt-8 py-4 lg:w-3/12 w-full bg-blue-700'>
                    <h1 className='text-white text-center text-xl font-bold my-4'>Add Funds</h1>


                    <form >

                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="cardNumber">cardNumber</label>
                            <input id="cardNumber" type='number' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required maxLength="16" pattern="[0-9]{2} \/ [0-9]{2}" onChange={(event) => handleChange(event, CARDNUMBER)} value={state.cardnumber} />
                        </div>

                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="account">Expiry Date</label>
                            <div className='flex gap-8'>
                                <input type="text" id="debit-card-expiry-date-month" placeholder="MM" maxLenght="2" pattern="[0-9]{2} \/ [0-9]{2}" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required min="1" max="12" name='exp-month' onChange={(event) => handleChange(event, CARDMONTH)} value={state.cardmonth} />
                                <input type="text" id="debit-card-expiry-date-year" placeholder="YY" maxLenght="2" pattern="[0-9]{2} \/ [0-9]{2}" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required name='exp-year' onChange={(event) => handleChange(event, CARDYEAR)} value={state.cardyear} />
                                <input type="text" id="debit-card-cvv" placeholder="CVV" maxLenght="3" pattern="[0-9]{2} \/ [0-9]{2}" className='rounded w-full active:shadow focus:shadow px-4 py-1 border outline-none' required name='cvv' onChange={(event) => handleChange(event, CARDCVV)} value={state.cvv} />
                            </div>

                        </div>
                        <div className='flex flex-col lg:gap:4 gap:2  px-2 mt-4 '>
                            <label className='text-sm text-white' htmlFor="cardPin">PIN</label>
                            <input id="cardPin" type='password' className='rounded active:shadow focus:shadow px-4 py-1 border outline-none' required maxLenght="4" pattern="[0-9]{2}" onChange={(event) => handleChange(event, CARDPIN)} value={state.pin} />
                        </div>



                    </form>

                </div>
            </div>
        </section>
    )
}

export default AddMoney