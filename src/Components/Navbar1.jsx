import React, { useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';
import { AddContext } from '../Context/ProductContext';
import { UserContext, auth } from '../Context/AuthContext';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantity } = useContext(AddContext)
    const { user } = useContext(UserContext)
    console.log(user);
    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link to="/"> Kar Rakib</Link>

            </p>
            <div className='Nav'>

                {user?.email ? <>

                    <Link to='/my-orders'>My Orders</Link>
                    <Link onClick={() => auth.signOut()}>Log-Out</Link>
                    {user?.photoURL ? <img className='image' src={user?.photoURL} alt="" /> :
                        <Link> <AiOutlineUser /></Link>}
                </> : <>
                    <div className='navItems'>
                        
                        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}> LogIn/SignUp </NavLink>

                    </div>
                </>
                }
                <button type='button' onClick={() => setShowCart(true)} className='cart-icon'>
                    <AiOutlineShoppingCart />
                    <span className='cart-item-qty'>{totalQuantity} </span>
                </button>
            </div>



            {showCart && < Cart />}
        </div>
    );
};

export default Navbar;