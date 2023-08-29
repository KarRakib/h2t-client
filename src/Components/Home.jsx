import React, { useEffect } from 'react';
import HeroBanner from './HeroBanner';
import Product from './Product';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [datas, setDatas] = useState([])
useEffect(()=>{
  axios.get('https://h2t-server.vercel.app/best-sell')
  .then(res=>{
    setDatas(res.data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
},[])

  return (
    <div className='py-5'>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='marquee'>
        <div className='products-container gap-8 maylike-products-container track '>
        {datas.map((product) => <Product key={product._id} product={product} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;