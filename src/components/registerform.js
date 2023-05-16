import React, {useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import { Outlet, Link, Route, Routes } from "react-router-dom";
import "./registerform.css"

const RegisterForm = () => {


    const [popupStyle, showPopup] = useState("hide")
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    return (
        <div className="page">
            <div className="cover">

                <h1>register</h1>
                {/* */}
                <input type="text" required placeholder="username" />

                <input type="password" required placeholder="password" />

                <input type="password" required placeholder="Confirm Password" />

                <div class="forgot">
                    <Link to="/login">Already have an account?</Link>
                </div>

                {/*Login Button */}
                <div className="login-btn" onClick={popup}>register</div>
            </div>
            <Outlet />
        </div>
    )
}

export default RegisterForm