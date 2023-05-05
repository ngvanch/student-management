import React, {useEffect, useState} from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import Popup from 'reactjs-popup';
import "./loginform.css"
import { Outlet, Link, Route, Routes } from "react-router-dom";
import RegisterForm from "./registerform";
import Home from "./Home";
  
const LoginForm = () => {

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

                <h1>Login</h1>
                {/* */}
                <input type="text" required placeholder="username" />

                <input type="password" required placeholder="password" />

                {/* Forgot Link*/}
                <div class="forgot">
                    <a  href="/forgot" >Forgot Password?</a>
                </div>
                

                {/*Login Button */}
                <div className="login-btn" onClick={popup}>Login</div>

                {/*Signup Link */}
                <div class="signup_link">
                    Not a member?   <Link to="/registerform">sign up</Link> 
                </div>


                <div className={popupStyle}>
                    <h3 >Login Failed</h3>
                    <p>Username or password incorrect</p>
                </div>
            </div>
            <Outlet />
        </div>
            
    )
}

export default LoginForm