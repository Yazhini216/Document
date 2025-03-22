import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Doc from "./pages/Doc";
import Home from './pages/Home'
import Chat from './pages/Chat'
import About from "./pages/About";
import PricingSection from "./pages/PricingSection";
import Contact from "./pages/Contact";
import ViewFiles from "./pages/ViewFiles";
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
            <Route path="/price" element={<PricingSection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rec" element={<ViewFiles />} />

    </Routes>
</Router>
 );
};

export default App;
