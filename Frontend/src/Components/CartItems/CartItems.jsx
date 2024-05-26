import React, { useContext, useState } from "react";
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [promoDetails, setPromoDetails] = useState({
        promocode: ""
    });
    const [total, setTotal] = useState(getTotalCartAmount()); 
    const changeHandler = (e) => {
        setPromoDetails({ ...promoDetails, [e.target.name]: e.target.value });
    }

    const Add_Promo = async () => {
        const validPromoCode = "DISCOUNT10";
        if (promoDetails.promocode === validPromoCode) {
            const discountedTotal = getTotalCartAmount() * 0.9;
            setTotal(discountedTotal); 
            alert("Promo code applied successfully!");

        } else {
            alert("Invalid promo code");
        }
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <p>${total}</p> {/* Display the updated total */}
                        </div>
                    </div>
                    <Link to="/checkout" className="proced">Proceed to checkout</Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" value={promoDetails.promocode} onChange={changeHandler} name="promocode" placeholder='Enter your promo code' />
                        <button onClick={() => { Add_Promo() }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;
