import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Doc from "./pages/doc";
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from "./pages/About";
const App = () => {
 return(
   <Router>
    <Routes>
    <Route path="/" element={<Home />} />
            <Route path="/login1" element={<LoginPage />} />
            <Route path="/signup1" element={<SignUp />} />
            <Route path="/doc" element={<Doc />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/about" element={<About />} />

    </Routes>
</Router>
 );
};

export default App;
