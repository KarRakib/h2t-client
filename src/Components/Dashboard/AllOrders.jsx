import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

const AllOrders = () => {
  const { user } = useContext(UserContext)
  const [myOrders, setMyOrders] = useState([]);
  const {isFetching } = useQuery();

  useEffect(() => {
    fetch('https://h2t-server.vercel.app/get-order',)
      .then(res => res.json())
      .then(data => setMyOrders(data))
  }, [])
  console.log(myOrders);
  {
    myOrders.map(order => console.log(order))
  }
  const handleChangeStatus =(id) =>{
    fetch(`https://h2t-server.vercel.app/status/${id}`,{
      method:"PATCH"
    })
    .then(res=>res.json())
        .then(data => {
          console.log(data)
          isFetching ()
        })
  }
  let buttonColorClass = '';
  
  // if (orders?.status === 'Shipping') {
  //   buttonColorClass = 'bg-red-500';
  // } else if (orders?.status === 'Pending') {
  //   buttonColorClass = 'bg-yellow-500';
  // }
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Address</th>
            <th>Transition Id</th>
            <th>Contact Number</th>
            <th>Status</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {
            myOrders?.map(orders => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <th>{orders?.data?.address1} </th>
                <th>{orders?.data?.id} </th>
                <th>{orders?.data?.contact} </th>
                <th><button 
                
                onClick={()=> handleChangeStatus(orders._id)}> {orders?.status} </button> </th>
                <th><Link to={`all-orders/${orders._id}`}>View </Link> </th>
              </tr>

            ))
          }


        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;