import React from 'react';
import { Link } from 'react-router-dom';


const HeroBanner = () => {
    return (
        <div className='hero-banner-container'>
            <div>
                <p className='beats-solo'>Welcome to</p>
                <h3 className='flex'> <span className='font-serif italic'>H</span> <span className='text-pink-600'>2</span> T <span>Bazar</span> </h3>
                <img className='hero-banner-image' src="https://i.ibb.co/s6fycBR/a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555.webp" alt="" />
                <div>
                    <Link to='/products'>
                        <button type='submit'> Shop Now </button>
                    </Link>
                    <div className='desc'>
                        <h5> Description</h5>
                        <p>DIS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;