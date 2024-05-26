import React, { useState, useContext, useEffect } from 'react';
import './Checkout.css';
import { ShopContext } from '../../Context/ShopContext';

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);
  const [total, setTotal] = useState(0); 

  useEffect(() => {
    const initialTotal = getTotalCartAmount();
    const discount = 0.1; 
    const discountedTotal = initialTotal - (initialTotal * discount);
    setTotal(discountedTotal);
  }, [getTotalCartAmount]);

  const [orderDetails, setOrderDetails] = useState({
    firstname: "",
    lastname: "",
    country: "",
    city: "",
    phone: "",
    total: 0
  });

  const changeHandler = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  }

  const Add_Order = async () => {
    const updatedOrder = { ...orderDetails, total };
    console.log(updatedOrder);
    try {
      const response = await fetch('http://localhost:4000/addorder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      const data = await response.json();
      if (data.success) {
        alert("Thank you for passing the order");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='checkout_container'>
      <div className='checkout'>
        <h2>BILLING INFORMATION</h2>
        <div className='formm'>
          <form method='POST'>
            <input type="text" value={orderDetails.firstname} onChange={changeHandler} name="firstname" placeholder='First Name' />
            <input type="text" value={orderDetails.lastname} onChange={changeHandler} name="lastname" placeholder='Last Name' />
            <input type="text" value={orderDetails.country} onChange={changeHandler} name="country" placeholder='Country' />
            <input type="text" value={orderDetails.city} onChange={changeHandler} name="city" placeholder='City' />
            <input type="text" value={orderDetails.phone} onChange={changeHandler} name="phone" placeholder='Phone Number' />
          </form>
        </div>
      </div>
      <div className="">
        <h2 className='checkouth2'>Your Order</h2>
        <div className='cartitems-total'>
          <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
            <p>The new total with 10% off</p>
            <p>${total}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <p>${total}</p>
          </div>
        </div>
        <button onClick={Add_Order} type='button'>Order</button>
      </div>
    </div>
  )
}

export default Checkout;
