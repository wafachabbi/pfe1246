import React, { useState } from "react";
import './LoginSignup.css';


const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const loginadmin = async () => {
        console.log("Login Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/loginadmin', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }
    const signupadmin = async () => {
        console.log("Signup Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/signupadmin', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? loginadmin() : signupadmin() }}>Continue</button>
                {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
                    <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
                    <a className="forget" href="/forgotpasswordform">Forget Password ?</a>
            </div>
        </div>
    )
}
export default LoginSignup