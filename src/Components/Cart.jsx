import React, { useContext, useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { AddContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';
const Cart = () => {
    const { totalPrice, totalQuantity, cartItems, setShowCart, toggleCartQuantity, removeCart } = useContext(AddContext)
    const cartRef = useRef()
    console.log('cart', totalPrice, totalQuantity, cartItems);
    return (

        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button onClick={() => setShowCart(false)} type='button' className='cart-heading'>
                    <AiOutlineLeft />
                    <span className='heading'>You Cart</span>
                    <span className='cart-num-items'>{totalQuantity} </span>
                </button>
                {
                    cartItems.length < 1 && (
                        <div className='empty-cart content-center'>
                            <AiOutlineShopping size={150} className='ml-24 md:ml-40' />
                            <h3> Your Shopping bag is empty</h3>
                            <Link to='/'
                                onClick={() => setShowCart(false)}
                                className='btn'
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                <div className='product-container'>
                    {
                        cartItems?.map(item => (
                            <div className='product' key={item._id}>
                                <img src={item?.images[0]?.smallImage} className='cart-product-image' alt="" />
                                <div className='item-desc'>
                                    <div className='flex top'>
                                        <h5> {item.name} </h5>
                                        <h4> {item.price*item.quantity} </h4>
                                    </div>
                                    <div className='flex bottom'>
                                        <div>
                                            <p className=' Increase border border-indigo-600 text-xl '>
                                                <span onClick={() => toggleCartQuantity(item._id, 'dec')} className=''><AiOutlineMinus /> </span>
                                                <span className='border-x-2 px-2 border-indigo-500'>{item.quantity} </span>
                                                <span onClick={() => toggleCartQuantity(item._id, 'inc')} className='plus'><AiOutlinePlus /> </span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeCart(item)}
                                            type='button'
                                            className='remove-item'
                                        >
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                   
                   cartItems.length >=1 &&  <div className='cart-bottom'>
                            <div className='total'>
                                <h3>Subtotal:</h3>
                                <Link
                                 onClick={() => setShowCart(false)}
                                   to='/payment'
                                    type='button'
                                    className='bg-[#f02d34] text-white py-2 px-4 rounded text-2xl '>
                                    Buy now
                                </Link>
                                <h3>{totalPrice} Taka </h3>
                            </div>
                            <div className=''>
                                
                            </div>
                        </div>
                    
                }
            </div>
        </div>
    );
};

export default Cart;