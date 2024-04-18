import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import LoginSignup from "./Pages/LoginSignup/LoginSignup";

const App = () =>{
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}
export default App