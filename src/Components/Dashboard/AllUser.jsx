import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AllUser = () => {
    const [alluser, setAlluser] = useState([])
    useEffect(() => {
        fetch('https://h2t-server-karrakib.vercel.app/users')
            .then(res => res.json())
            .then(data => setAlluser(data))
    }, [])
    console.log(alluser);

    const handlerDelete = id => {
        const confirm = window.confirm('Are You Confirm to Delete')
        if (confirm) {
            fetch(`https://h2t-server-karrakib.vercel.app/users/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    setAlluser(prev => prev.filter(user => user._id !== id))
                })
        }
    }

    return (
        <>
            <div className="p-5 h-screen bg-gray-100">
                <h1 className="text-xl mb-2">Your orders</h1>

                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>

                                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                alluser.map(user => (
                                    // eslint-disable-next-line react/jsx-key
                                    <tr key={user._id}>
                                        <td>{user.name} </td>
                                        <td>{user.email} </td>
                                        <td>{user.role} </td>

                                        <td onClick={()=>handlerDelete(user._id)}> <button className='btn btn-success'>Delete</button> </td>


                                    </tr>
                                ))



                            }

                        </tbody>
                    </table>
                </div>


            </div>
        </>
    );
};

export default AllUser;