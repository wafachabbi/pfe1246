import React, { useEffect, useState } from "react";
import './ListMessage.css';


const ListMessage = () =>{

    const [allcontacts,setAllContacts] = useState([]);
    const fetchInfo = async ()=>{
      await fetch('http://localhost:4000/allcontacts')
      .then((res)=>res.json())
      .then((data)=>{setAllContacts(data)});
    }
    useEffect(()=>{
      fetchInfo();
    },[])
   
    return (
        <div className='list-product'>
          <h1>All Messages List</h1>
          <div className="listproduct-format-main">
            <p>FullName</p>
            <p>Email</p>
            <p>Subject</p>
            <p>Message</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allcontacts.map((contact,index)=>{
              return<> 
              <div key={index} className="listproduct-format-main listproduct-format">
              <p>{contact.fullname}</p>
                <p>{contact.email}</p>
                <p>{contact.subject}</p>
                <p>{contact.message}</p>
              </div>
              <hr /> </>
            })}
          </div>
        </div>
      )
}
export default ListMessage