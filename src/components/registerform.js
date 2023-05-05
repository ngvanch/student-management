import React, {useEffect, useState} from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import Popup from 'reactjs-popup';
import { Outlet, Link, Route, Routes } from "react-router-dom";
import "./registerform.css"

const RegisterForm = () => {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    })

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
                    <a  href="/login" >Already have an account?</a>
                </div>

                {/*Login Button */}
                <div className="login-btn" onClick={popup}>register</div>
            </div>
            <Outlet />
        </div>
    )
}

export default RegisterForm