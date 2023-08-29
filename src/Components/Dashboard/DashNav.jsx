import React, { useContext } from 'react';
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import  { UserContext } from '../../Context/AuthContext';

const DashNav = () => {
  const {userSignOut } = useContext(UserContext)
    return (
        <div className="navbar bg-[#FAFBFD] lg:hidden ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {
              <>
                 <li><Link to="/admin/all-orders">All Orders</Link></li>
                <li><Link to="/admin/all-user">All User</Link></li>
                <li><Link to="/admin/add-products">Add Products</Link></li>
                <li><Link to="/admin/add-sell">Add Seller</Link></li>
                <li> <Link to={'/'}> <AiOutlineHome className='bg-red-700' /> Home</Link></li>
                <li> <button onClick={()=> userSignOut()}> <AiOutlineLogout />Log Out  </button> </li>              
              </>
            }
                
            </ul>
          </div>
         
        </div>
        
      </div>
    );
};

export default DashNav;