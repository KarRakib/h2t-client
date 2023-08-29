import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TbTruckDelivery } from 'react-icons/tb'
import { AddContext } from '../../Context/ProductContext';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/AuthContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const { cartItems, resetCart, totalPrice, totalQuantity, setTotalQuantity, setTotalPrice } = useContext(AddContext)
    const { user } = useContext(UserContext)
    const { register, handleSubmit } = useForm();
    const currentDate = new Date();
    const toDay = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    const orderNumber = Math.floor(Math.random() * 1000000) + 1;
    const navigate = useNavigate()
    const grandPrice = parseInt(totalPrice) + 150
    const onSubmit = (data) => {
        // console.log(data);
        // const rest = cartItems.forEach(element => {
        //     const name = data.firsName
        //     console.log(element.name += 'kar');
        // });
        fetch('https://h2t-server.vercel.app/add-order', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: user.email, cartItems, data,order: orderNumber,
                date: toDay,status: 'Pending', grandPrice })

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    navigate('/my-orders')
                    toast.success(`price: ${totalPrice} items: ${totalQuantity}`, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    resetCart()
                }

            })
    }



    return (
        <div>
            <div className="overflow-y-hidden">
                <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
                    <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full  flex-col justify-start items-start">
                            <div className>
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                            </div>
                            <div className="mt-2">
                                <a href="javascript:void(0)" className="text-base leading-4 underline  hover:text-gray-800 text-gray-600">
                                    Back to my bag
                                </a>
                            </div>
                            <div className="mt-12">
                                <p className="text-xl font-semibold leading-5 text-gray-800">Shipping Details</p>
                            </div>
                            <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                                <input {...register("Name",{required:true})} value={user?.displayName} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="First Name" />
                                <input {...register("address1",{required:true})} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address" />
                                <input {...register("address2")} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="text" placeholder="Address (line 02)" />
                                <input {...register("contact",{required:true})} className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full" type="number" placeholder="Contact Number" />
                                <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                    <div className="relative w-full">
                                        <select {...register("paymentMethod", { required: true })} className="select focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4  w-full max-w-xs  ">
                                            <option disabled selected>Payment Method</option>
                                            <option value={'Bkash'}>Bkash</option>
                                            <option value={'Nagod'}>Nagod</option>
                                            <option value={'Rocket'}>Rocket</option>
                                        </select>

                                    </div>

                                </div>
                                <input {...register("number",{required:true})} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="number" placeholder="Payment Number" />
                                <br />
                            </div>
                            <input {...register("id",{required:true})} className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full" type="text" placeholder="Transition ID" />
                            <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">Proceed to payment</button>
                            <div className="mt-4 flex justify-center items-center w-full">
                                <div>
                                    <p className='text-center text-cyan-500'>We Provide delivery</p>
                                    <img src="https://bangladeshbusinessdir.com/wp-content/uploads/2015/09/courier-services-bangladesh.gif" alt="" />
                                </div>
                                {/* <Link href="javascript:void(0)" className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                                Back to my bag
                            </Link> */}
                            </div>
                        </form>
                        <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                            <div>
                                <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                            </div>
                            <div className="flex mt-7 flex-col items-end w-full space-y-6">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total items</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">{totalQuantity}</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">{totalPrice}Tk</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">150 Tk</p>
                                </div>
                            </div>
                            <div className="flex justify-between w-full items-center mt-32">
                                <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                                <p className="text-lg font-semibold leading-4 text-gray-800">{ grandPrice} Tk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;