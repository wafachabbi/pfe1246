import React, { useEffect, useState } from "react";
import './ListOrder.css';


const ListOrder = () =>{

    const [allorders,setAllOrders] = useState([]);
    const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/allorders')
      .then((res)=>res.json())
      .then((data)=>{setAllOrders(data)});
    }
    useEffect(()=>{
      fetchInfo();
    },[])
   
    return (
        <div className='list-productt'>
          <h1>All Orders List</h1>
          <div className="listproduct-format-main">
            <p>FirstName</p>
            <p>LastName</p>
            <p>Country</p>
            <p>City</p>
            <p>Phone</p>
            <p>Total</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allorders.map((order,index)=>{
              return<> 
              <div key={index} className="listproduct-format-mainn ">
               <p>{order.firstname}</p>
                <p>{order.lastname}</p>
                <p>{order.country}</p>
                <p>{order.city}</p>
                <p>{order.phone}</p>
                <p>{order.total}</p>
              </div>
              <hr /> </>
            })}
          </div>
        </div>
      )
}
export default ListOrder