/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Products = ({ products }) => {
    console.log(products[0].images[0].smallImage);
    return (
        <div className='products-container gap-8 py-5'>
            {
                products.map(product => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={product._id}>
                        <div  className='product-card border text-center border-indigo-600 rounded-md'>
                            <Link to={`/products/${product?._id}`}>
                                <img
                                    className='product-image'
                                    width={250}
                                    height={250}
                                    // eslint-disable-next-line react/prop-types
                                    src={product?.images[0]?.smallImage} alt="" srcSet="" />
                            </Link>
                            <div className='flex justify-between'>
                                <p className='product-name'>{product?.name}</p>
                                <p className='product-price'>{product?.price}Tk </p>
                            </div>
                            <Link to={`/products/${product?._id}`}><button className='add-button justify-center'>Add To Cart</button></Link>
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default Products;