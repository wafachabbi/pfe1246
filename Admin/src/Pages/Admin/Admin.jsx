import React from "react";
import './Admin.css'
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes,Route} from 'react-router-dom';
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ListOrder from "../../Components/ListOrder/ListOrder";
import ListUser from "../../Components/ListUser/ListUser";
import ListMessage from "../../Components/ListMessage/ListMessage";
import LoginSignup from "../../Pages/LoginSignup/LoginSignup";




const Admin = () =>{
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/listorder' element={<ListOrder/>} />
        <Route path='/listuser' element={<ListUser/>} />
        <Route path='/listmessage' element={<ListMessage/>} />
        <Route path='/login' element={<LoginSignup/>} />
      </Routes>
    </div>
  )
}
export default Admin