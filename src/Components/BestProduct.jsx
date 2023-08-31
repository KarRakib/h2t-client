/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BestProduct = ({ product }) => {
  console.log('from products',product);

  return (
    <div>
      <div className='product-card border text-center border-indigo-600'>
        <Link to='products'>
          <img
            className='product-image'
            width={250}
            height={250}
            // eslint-disable-next-line react/prop-types
            src={product.images[0]?.largeImage} alt="" srcSet="" />
        </Link>
        <div className='flex justify-between'>
          <p className='product-name'>{product?.name}</p>
          <p className='product-price'>{product?.price}Tk </p>
        </div>
        <Link to='/products'><button  className='add-button justify-center'>Add To Cart</button></Link>
      </div>

    </div>
  );
};

export default BestProduct;