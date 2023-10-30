
import "./static/css/index.css";
import "./static/css/styles.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useState } from "react";
// import Cookies from "universal-cookie";
// import Carousel from "./components/Carosel";
import Header from "./components/Header";
import Home from "./components/Home";


function App() {
  return (
    <div className="App w-full flex  flex-col items-center justify-center">
      <Header /> 

      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
