import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import { UserContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import useToken from '../Components/Dashboard/hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, reset } = useForm();
    const apiKey = 'a212c56047d087bb05d56007d681eccd'
    const { userRegister, upDateUser, emailVerify, signInGoogle, signInFacebook } = useContext(UserContext)
    const [createUserEmail, setCreateUserEmail] = useState('')
    const navigate = useNavigate()
    // const [token] = useToken(createUserEmail)
    // if(token){
    //     navigate('/')
    // }
    const [isChecked, setIsChecked] = useState(false)
    const handleForm = data => {

        const formData = new FormData()
        userRegister(data?.email, data?.password)
            .then(result => {

                // emailVerify()
                const user = result.user
                const photo = data.file[0]

                formData.append('image', photo)
                const url = 'https://api.imgbb.com/1/upload?key=a212c56047d087bb05d56007d681eccd'
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imagData => {
                        console.log(imagData.data.url);
                        upDateUser(data?.name, imagData.data.url)

                    })
                    .then(() => {
                        sendUser(data?.name, data?.email)
                    }).catch((error) => {

                    });

                reset()
            })
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    const sendUser = (name, email) => {
        const user = { name, email }
        fetch('https://h2t-server.vercel.app/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreateUserEmail(email)
                console.log('signup', data)
                const currentUser = {
                    email: user.email
                  }
                if (data.acknowledged) {
                    fetch('https://h2t-server.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(currentUser)

                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            localStorage.setItem('h2t-token', data.token)
                        })
                    // emailVerify()
                    console.log('ki hoilo');
                    toast.success(`${user.name} congration`)
                    navigate('/')
                }
            })
    }
    const handleGoogle = () => {
        signInGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorMessage = error.message;
            });
    }
    const handleFacebook = () => {
        console.log('face');
        signInFacebook()
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorMessage = error.message;
            });
    }
    return (
        <div>
            <div className="relative min-h-screen bg-purple-100 backdrop-blur flex justify-center items-center bg-texture bg-cover py-28 sm:py-0">
                <div className="p-4 sm:p-8 flex-1 ">
                    <div className="max-w-[420px] min-w-[320px] bg-white rounded-b-3xl mx-auto">
                        {/* <div className="relative h-auto">
                            <svg className="absolute -top-20 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#fff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                            <div className="absolute bottom-5 right-2">
                                <a href="#" className="block transition hover:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </a>
                            </div>
                        </div> */}
                        <div className="px-10 pt-4 pb-8 rounded-3xl shadow-xl">
                            <div className="mx-auto text-center">
                                <h1 className="text-2xl text-gray-800">Register</h1>
                                <p className="mt-1">How do you want to sign up ?</p>
                            </div>
                            <div className="flex items-center justify-center gap-2  mt-6">
                                <div onClick={handleFacebook} className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white saturate-200 transition-all hover:bg-red-500">
                                    <a className="block">
                                        <AiFillFacebook className="text-3xl rounded-lg" />
                                    </a>
                                </div>

                                <div onClick={handleGoogle} className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 text-white saturate-200 transition-all hover:bg-blue-600">
                                    <a className="block">
                                        <FaGoogle className='text-3xl rounded-lg' />
                                    </a>
                                </div>

                            </div>
                            <div className="flex items-center my-4">
                                <hr className="flex-1" />
                                <span className="px-4 text-sm text-gray-400">Or countinue with</span>
                                <hr className="flex-1" />
                            </div>
                            <form onSubmit={handleSubmit(handleForm)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input {...register('file', { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register('name', { required: true })} placeholder="name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register('password', { required: true })} placeholder="password" className="input input-bordered" />
                                </div>
                                <div className="mt-10">
                                    <label className="inline-flex items-center">
                                        <input onChange={handleCheckboxChange} type="checkbox" className="rounded border-gray-300 text-purple-600 focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200/50" />
                                        <span className="ml-2 text-sm">Check here that you have agree to <a href="#" className="font-semibold text-purple-600 hover:underline">the terms.</a></span>
                                    </label>
                                </div>
                                <button disabled={!isChecked} type="submit" className="w-full mt-14 py-4 text-lg text-white font-semibold text-center rounded-full bg-purple-500 transition-all hover:bg-purple-600 focus:outline-none">Sign up</button>
                                <p className="text-center text-sm text-gray-400 mt-4">Have an account ? <Link to='/login' className="font-semibold text-purple-600 hover:underline">Log in</Link></p>
                            </form>


                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default SignUp;