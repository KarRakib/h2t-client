import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from '../../Context/AuthContext';

const MyOrderView = () => {
    const orderDetails = useLoaderData();
    const { order, modified, status, date, totalPrice } = orderDetails
    console.log(orderDetails);
    const { user } = useContext(UserContext)
    return (
        <div>
            <section className=" bg-[#E4D1F7]  border-black">
                <div className="container py-5 h-full border-inherit">
                    <div className="flex justify-center items-center h-full border-inherit">
                        <div className="lg:col-span-10 xl:col-span-8 bg-[#fff] rounded border-black">
                            <div className="card rounded-md">
                                <div className="card-header flex justify-between px-4 py-5">
                                    <h5 className="text-muted  mb-0">
                                        Thanks for your Order, <span className="text-purple-500">{user?.displayName} </span>!
                                    </h5>
                                    <p>Status : {status} </p>
                                </div>
                                <div className="card-body p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-xl font-normal mb-0 text-purple-500">Receipt</p>
                                        <p className="text-sm text-gray-400 mb-0">Receipt Voucher: OD-{order} </p>
                                    </div>
                                    <div className="card shadow-none border mb-4">
                                        {
                                            modified.map(order => (
                                                // eslint-disable-next-line react/jsx-key
                                                <div className="card-body">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        <div className="col-span-1">
                                                            <img
                                                                src={order?.images}
                                                                className="w-20 h-20"
                                                                alt="Phone"
                                                            />
                                                        </div>
                                                        <div className="col-span-1 flex justify-start items-center">
                                                            <p className="text-gray-400 mb-0">{order.name} </p>
                                                        </div>
                                                        <div className="col-span-1 flex justify-center items-center">
                                                            <p className="text-gray-400 text-sm mb-0">White</p>
                                                        </div>

                                                        <div className="col-span-1 flex justify-center items-center">
                                                            <p className="text-gray-400 text-sm mb-0">Qty: {order.quantity} </p>
                                                        </div>
                                                        <div className="col-span-1 flex justify-center items-center">
                                                            <p className="text-gray-400 text-sm mb-0">{order.price * order.quantity} $ </p>
                                                        </div>
                                                    </div>
                                                    <hr className="mb-4 border-gray-300" />

                                                </div>
                                            ))
                                        }
                                    </div>


                                    <div className="flex justify-between pt-2">
                                        <p className="font-bold mb-0">Order Details</p>
                                        <p className="text-gray-400 mb-0">
                                            <span className="font-bold me-4">Total</span> {totalPrice} $
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-400 mb-0">Invoice Date: {date} </p>
                                       
                                    </div>

                                    <div className="flex justify-between mb-5">
                                        <p className="text-gray-400 mb-0">Receipt Voucher: 18KU-62IIK</p>
                                        <p className="text-gray-400 mb-0">
                                            <span className="font-bold me-4">Delivery Charges</span> 150 $
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer border-0 px-4 py-5 bg-purple-500 rounded-b-md">
                                    <h5 className="flex items-center justify-end text-white uppercase mb-0">
                                        Total paid: <span className="text-2xl font-semibold ms-2">{totalPrice}$ </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyOrderView;