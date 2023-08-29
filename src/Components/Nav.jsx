import React, { useContext, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';
import { AddContext } from '../Context/ProductContext';
import { UserContext, auth } from '../Context/AuthContext';
import './css.css'
const Nav = () => {
  const { showCart, setShowCart, totalQuantity } = useContext(AddContext);
  const { user,userSignOut } = useContext(UserContext);
  const [showNavItems, setShowNavItems] = useState(false); // Track the state of navigation items visibility
const logOut = ()=>{
  userSignOut()
  .then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
 

  return (
  
    <nav>
      <div className="navbar">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
            <h1 className='pl-20 pt-3'>H2T Bazar</h1>
          <div className="logo">
          {user?.email &&<li onClick={logOut}><a >LogOut</a></li>}
            <button type='button' onClick={() => setShowCart(true)} className='cart-icon AddCart'>
                    <AiOutlineShoppingCart />
                    <span className='cart-item-qty '>{totalQuantity} </span>
                </button>
          </div>
          <div className="menu-items text-cyan-300">
            <li><a href="#">Home</a></li>
            <li><a href="#">about</a></li>
            <li><a href="#">blogs</a></li>
            <li><a href="#">portfolio</a></li>
            
          </div>
        </div>
      </div>
      {showCart&& <Cart/>}
    </nav>
  
  );
};

export default Nav;
