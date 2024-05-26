import React, { useContext , useState } from "react";
import './CSS/ShopCategory.css';
import {ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) =>{
    const {all_product} = useContext(ShopContext); /*pour accéder à ShopContext et 
    extrait la variable all_product du contexte */
   
    return (
        <div className='shop-category'> 
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
            <p>
                <span>Showing 1-12</span> out of 36 products
            </p>
            <div className="shopcategory-sort"> 
               Sort by <img src={dropdown_icon} alt="" />
            </div>
        </div>
        <div className="shopcategory-products">
            {all_product.map((item,i)=>{ /*map est utilisée pour itérer sur all_product. */
                if (props.category===item.category){
                    return <Item key={i} id={item.id} name={item.name} image={item.image}
                    new_price={item.new_price} old_price={item.old_price}/>
                    /* si la catégorie du produit (item.category) correspond à la catégorie passée dans les props 
                    (props.category), le composant Item est rendu avec les propriétés du produit  */
                }
                else {
                    return null;
                }
            })}
        </div>
        <div className="shopcategory-loadmore"> 
        Explore More
        </div>
        </div>
    )
}
export default ShopCategory