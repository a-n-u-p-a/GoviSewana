import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "../pages/welcome/welcome";
import Otp from "../pages/otp/otp";
import MainForm from "../pages/main/mainForm";
import Authentication from "../pages/auth/authentication";

// http://localhost:3000/               ===================> welcome
// http://localhost:3000/auth           ===================> sign in
// http://localhost:3000/otp            ===================> otp
// http://localhost:3000/main           ===================> main form

const RootRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/auth" element={<Authentication/>}/>
                <Route path="/otp" element={<Otp/>}/>
                <Route path="/main" element={<MainForm/>}/>
            </Routes>
        </Router>
    )
}

export default RootRoutes;
