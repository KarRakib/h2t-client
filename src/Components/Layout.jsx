import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'
import HeroBanner from './HeroBanner';
import FooterBanner from './FooterBanner';

const Layout = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            {/* <Nav></Nav> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
            <FooterBanner></FooterBanner>
        </div>
    );
};

export default Layout;