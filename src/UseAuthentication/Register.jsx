import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { UserContext } from '../Context/AuthContext';
import { useState } from 'react';
const Register = () => {
  const { userRegister, upDateUser } = useContext(UserContext)
  const [isChecked, setIsChecked] = useState(true)
  
  const { register, handleSubmit,reset, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    
    const formData = new FormData()
    userRegister(data?.email, data?.password)
      .then(result => {
        const user = result.user
        const photo = data.file[0]
        
        formData.append('image',photo)
        const url = 'https://api.imgbb.com/1/upload?expiration=600&key=a212c56047d087bb05d56007d681eccd'
        fetch(url,{
          method:'POST',
          body:formData
        })
        .then(res=> res.json())
        .then(imagData=>{
          console.log(imagData.data.url);
          upDateUser(data?.name, imagData.data.url)
        })
        .then(() => {
          console.log('log', data);
          sendUser(data?.name, data?.email)
          
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
        reset()
      })
  }
const handleCheckboxChange= ()=>{
  setIsChecked(!isChecked)
}
const sendUser = (name, email)=>{
  console.log(name);
  const user = {name, email}
  fetch('https://h2t-server.vercel.app/users',{
    method:'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(user)
     })
     .then(res=>res.json())
     .then(data=>{
      if(data.acknowledge){
        toast.success(`${user.name}`)
      }
     } )
} 
  return (

    <div className='container flex justify-center text-center py-5 backgroundImage '>
      <Card color="transparent" shadow={false}>
        <Typography variant="h6" color="blue-gray" >
          Sign Up
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input {...register('name',{required:true})} size="lg" label="Name" />
            <input {...register('file',{required:true})} type="file" className="file-input file-input-bordered w-full max-w-xs" />
            <Input {...register('email',{required:true})} size="lg" label="Email" />
            <Input type="password"  {...register("password", {
                                    required: true,
                                    // minLength: 6,
                                    // maxLength: 20,
                                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} size='lg' label="Password" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
          </div>
          <Checkbox
            label={
              (
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-blue-500"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              )
            }
            containerProps={{ className: "-ml-2.5" }}
            onChange={handleCheckboxChange}
          />
          <Button type='submit' className="mt-6" fullWidth disabled={!isChecked}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>

  );
};

export default Register;