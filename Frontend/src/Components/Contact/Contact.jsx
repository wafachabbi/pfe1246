
import React, { useState } from 'react';
import './Contact.css';
const Contact = () => {
  const [contactDetails,setContactDetails] = useState({
    fullname:"",
    email:"",
    subject:"",
    message:""
  })

  const changeHandler = (e) =>{
    setContactDetails({...contactDetails,[e.target.name]:e.target.value})
  }

  const Add_Contact = async ()=> {
    console.log(contactDetails);
    let contact = contactDetails;
  
        await fetch('http://localhost:4000/addcontact',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(contact),
        }).then((resp)=>resp.json()).then((data)=>{
          data.success?alert("Thank you for visiting our websit"):alert("Failed")
        })
      }
  
  return (
   <div className='contact_container'>
    <div className='contact'>
      <h2>Contact Us</h2>
      <div className='form'>
        <form method='POST'>
          <input type="text" value={contactDetails.fullname} onChange={changeHandler} name="fullname" placeholder='Enter your full name' />
          <input type="text" value={contactDetails.email} onChange={changeHandler} name="email" placeholder='Enter your email' />
          <input type="text" value={contactDetails.subject} onChange={changeHandler} name="subject" placeholder='Enter your subject'/>
          <textarea value={contactDetails.message} onChange={changeHandler} name="message" placeholder='Write your message' ></textarea>
          <button onClick={Add_Contact} type='button'>Send</button>
        </form>
      </div>
    </div>
   </div>
  )
}

export default Contact;
