/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from './Product';
import { AddContext } from '../Context/ProductContext';
import { UserContext } from '../Context/AuthContext';
import { useEffect } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';



// eslint-disable-next-line react/prop-types
const ProductDetails = ({ products }) => {
    const { user } = useContext(UserContext)
    const productDetails = useLoaderData();
    const [selectedSize, setSelectedSize] = useState(false);
    const { images, name, price, description, sizes } = productDetails;
    console.log(sizes);
    const { incQty, decQty, qty, addToCart, size, setSize } = useContext(AddContext)

    const ima = "https://i.ibb.co/x1C6rs0/flash-1.webp"
    const imagess = [
        { id: 1, smallImage: "https://i.ibb.co/x1C6rs0/flash-1.webp", largeImage: "https://i.ibb.co/x1C6rs0/flash-1.webp" },
        { id: 2, smallImage: " https://i.ibb.co/3yVykxL/watch-2.webp", largeImage: " https://i.ibb.co/3yVykxL/watch-2.webp" },
        { id: 3, smallImage: "https://i.ibb.co/GFnQpds/watch-1.webp", largeImage: "https://i.ibb.co/GFnQpds/watch-1.webp" },
      
    ];
    const [selectedImage, setSelectedImage] = useState(images[0]?.largeImage);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };


    const handleClick = (size) => {
        setSelectedSize(size);
    };
    useEffect(() => {
        setSize(selectedSize)
    }, [selectedSize])



    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <PhotoProvider>
                            <div className="foo">
                                {selectedImage && (
                                    <PhotoView src={selectedImage} className='product-detail-image' >
                                        <img className='product-detail-image' src={selectedImage} alt="" />
                                    </PhotoView>

                                )}
                            </div>
                        </PhotoProvider>

                    </div>
                    <div className='md:small-images-container flex'>
                        {images?.map((image) => (
                            <div
                                key={image.id}
                                className="md:w-32 w-24 h-32 m-2 cursor-pointer"
                                onClick={() => handleImageClick(image.largeImage)}
                            >
                                <img src={image.smallImage} alt={`Small Image ${image.id}`} className="md:w-full w-20 md:h-full" />
                            </div>
                        ))}

                    </div>
                </div>
                <div className='product-details-desc'>
                    <h1>{name} </h1>
                    <div className='reviews'>
                        <div className='flex'>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p> (7)</p>
                    </div>
                    <h4>Details</h4>
                    <p>{description} </p>
                    <div>
                        {
                            sizes?.map((size ,i)=> (
                                // eslint-disable-next-line react/jsx-key
                                <button key={i}
                                    onClick={() => handleClick(size.size)}
                                    className={`px-2 border ${selectedSize === size.size ? 'bg-indigo-600' : 'border-indigo-600'
                                        }`}
                                >
                                    {size.size}
                                </button>
                            ))
                        }

                    </div>
                    <p className='price'>{price} Tk </p>
                    <div className='quantity'>
                        <h3>Product Code #254712 </h3>
                        <p className='quantity-desc flex h-8 items-center '>
                            <span onClick={decQty} className='minus '><AiOutlineMinus /> </span>
                            <span className='num'>{qty} </span>
                            <span onClick={incQty} className='plus'><AiOutlinePlus /> </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button  onClick={() => addToCart(productDetails, qty)} type='button' className='add-to-cart'>Add to cart</button>
                        <button onClick='/' type='button' className='buy-now'>buy now </button>

                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                     
                        {products?.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;