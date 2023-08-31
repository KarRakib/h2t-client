import React, { useContext } from 'react';
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';
import { AddContext } from '../Context/ProductContext';
import { UserContext } from '../Context/AuthContext'
import useAdmin from './Dashboard/hooks/useAdmin';

const Navbar = () => {
    const { showCart, setShowCart, totalQuantity } = useContext(AddContext)
    const { user, userSignOut } = useContext(UserContext)
    const [isAdmin] = useAdmin(user?.email)
    console.log(import.meta.env.Name);
    console.log('nav', user?.email, isAdmin);
    const handleSignOut = () => {

        userSignOut()
    }
    const navItem = <>

        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}> Home </NavLink></li>
        <li><NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}> Products </NavLink> </li>
        {
            user?.email ? <>
                <li><Link to='/my-orders'>My Order</Link> </li>
                {
                    isAdmin && <li><Link to='/admin'>Admin</Link> </li>
                }
                <li><button onClick={handleSignOut}>Sign Out</button> </li>

            </> :
                <li tabIndex={0}>
                    <a>
                        <AiOutlineUser />
                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                    </a>
                    <ul className="p-2 bg-base-100">
                        <li><NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}> Sign Up</NavLink></li>
                        <li><NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}> LogIn </NavLink></li>
                    </ul>
                </li>
        }
        {

        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <Link className='btn btn-ghost normal-case text-xl' to="/">H2T</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end mr-1">
                    {user?.email && <img className="w-8 h-8 rounded-full mr-2" src={user?.photoURL} />}
                    <button type='button' onClick={() => setShowCart(true)} className='cart-icon'>
                        <AiOutlineShoppingCart />
                        <span className='cart-item-qty'>{totalQuantity} </span>
                    </button>
                </div>
            </div>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;