import React, {useEffect, useState} from "react";

import Popup from 'reactjs-popup';
import "./loginform.css"
import { Outlet, Link, Route, Routes } from "react-router-dom";
import RegisterForm from "./registerform";
import Home from "./Home";

  
const LoginForm = () => {

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
                    Not a member?   <Link to="/register">sign up</Link> 
                </div>
                

                <div className={popupStyle}>
                    <h3 >Login Failed</h3>
                    <p>Username or password incorrect</p>
                </div>
            </div>
        </div>
            
    )
}

export default LoginForm