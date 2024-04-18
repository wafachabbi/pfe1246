import React, { useEffect, useState } from "react";
import './ListUser.css';


const ListUser = () =>{

    const [allusers,setAllUsers] = useState([]);
    const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/allusers')
      .then((res)=>res.json())
      .then((data)=>{setAllUsers(data)});
    }
    useEffect(()=>{
      fetchInfo();
    },[])
   
    return (
        <div className='list-product'>
          <h1>All Users List</h1>
          <div className="listproduct-format-main">
            <p>Name</p>
            <p>Password</p>
            <p>Email</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allusers.map((users,index)=>{
              return<> 
              <div key={index} className="listproduct-format-main listproduct-format">
              <p>{users.name}</p>
              <p>{users.password}</p>
                <p>{users.email}</p>
                
              </div>
              <hr /> </>
            })}
          </div>
        </div>
      )
}
export default ListUser