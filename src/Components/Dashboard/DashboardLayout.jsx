import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext';

import DashNav from './DashNav';
import useAdmin from './hooks/useAdmin';
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';

const DashboardLayout = () => {
  const { user ,userSignOut } = useContext(UserContext);
  const [isAdmin] = useAdmin(user?.email)

  return (
    <div>
      <DashNav></DashNav>
      <div className="drawer drawer-mobile">
  
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-[#FAFBFD]">
       
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content bg-[#fafbfd]">
            {isAdmin &&
              <>
                <li><Link to="/admin">All Orders</Link></li>
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

export default DashboardLayout;