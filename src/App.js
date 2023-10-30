
import "./static/css/index.css";
import "./static/css/styles.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useState } from "react";
// import Cookies from "universal-cookie";
// import Carousel from "./components/Carosel";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Verified from "./components/Verified";
import { useState } from "react";


function App() {
  const [accountNum, setAccountNum] = useState("")
  return (

    

    <div className="App w-full flex  flex-col items-center justify-center">
      <Header /> 

      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<SignUp setAccountNum = {setAccountNum} />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/verified" element={<Verified  accountNum={accountNum}/>} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
