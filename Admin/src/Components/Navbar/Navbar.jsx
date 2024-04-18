import React from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () =>{
  return (
    <div className='navbar'>
        <img className="nav-logo" src={navlogo} alt="" />
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token');
            window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
        </div>
        </div>
        
  )
}
export default Navbar