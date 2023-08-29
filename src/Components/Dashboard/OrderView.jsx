import React from 'react';
import { useLoaderData } from 'react-router-dom';

const OrderView = () => {
    const ordersDetails = useLoaderData();
    console.log(ordersDetails)
    const { order, modified, date,data } = ordersDetails;
    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-16">
                <h1 className="font-bold text-2xl my-4 text-center text-blue-600">Order Summery</h1>
                <hr className="mb-2" />
                <div className="flex justify-between mb-6">
                    <h1 className="text-lg font-bold">Invoice</h1>
                    <div className="text-gray-700">
                        <div>Date: {date} </div>
                        <div>Invoice #: {order} </div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">{data.Name} </h2>
                    <div className="text-gray-700 mb-2">{data.address1} </div>
                    <div className="text-gray-700 mb-2">{data.contact} </div>
                    <div className="text-gray-700 mb-2">{data.paymentMethod} </div>
                    <div className="text-gray-700">johndoe@example.com</div>
                </div>
                <table className="w-full mb-8">
                    <thead>
                        <tr>
                            <th className="text-left font-bold text-gray-700">Description</th>
                            <th className="text-left font-bold text-gray-700">Quantity</th>
                            <th className="text-right font-bold text-gray-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        modified.map(modify=>(
                            // eslint-disable-next-line react/jsx-key
                            <tr>
                            <td className="text-left text-gray-700">{modify.name} </td>
                            <td className="text-left text-gray-700">{modify.quantity} </td>
                            <td className="text-right text-gray-700"> {modify.quantity* modify.price} Tk </td>
                        </tr>
                        ))
                       }
                        
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-left font-bold text-gray-700">Total</td>
                            <td className="text-right font-bold text-gray-700">$225.00</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="text-gray-700 mb-2">Thank you for your business!</div>
                <div className="text-gray-700">Please remit payment within 30 days.</div>
            </div>
        </div>
    );
};

export default OrderView;