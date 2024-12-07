import Lottie from 'lottie-react';

// import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbPasswordMobilePhone } from "react-icons/tb";
import registerAn from '../assets/animations/register.json';

import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";


const Register = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [pass, setPass]=useState(true);
    const [pic, setPic]= useState();
   
    const [load, setLoad]= useState(true);
      const navigate = useNavigate();
      const base= import.meta.env.VITE_BASEURL;
      console.log(base)

      const postDetails = (pic) => {
        setLoad(true);
        // Check if image is selected and valid
        if (pic && (pic.type === 'image/jpeg' || pic.type === 'image/png')) {
          const data = new FormData();
          data.append('file', pic);
          data.append('upload_preset', 'chat-app');
          data.append('cloud_name', "asif-db");
    
          fetch('https://api.cloudinary.com/v1_1/asif-db/image/upload', {
            method: 'post',
            body: data
          })
          .then(res => res.json())
          .then(data => {
            setPic(data.url); // Set the URL to pic state
            setLoad(false); // Image upload completed
          })
          .catch(err => {
            console.log(err);
            toast.error('Please select a valid image');
            setLoad(false); // Image upload failed
          });
        } else {
          toast.error("Please select a valid image (JPEG/PNG)");
          setLoad(false); // Set load to false if no image or invalid type
        }
      };
    
      const handleEye = () => {
        setPass(!pass);
      };
    
    
    
      const onSubmit = async (data) => {
        console.log(data)
        if (!pic) {
          toast.error("Please upload an image");
          return;
        }
    
        const formData = {
          ...data, 
          image: pic, // Add image URL to the form data
        };
        console.log(formData)
    
    
        try {
          const res = await axios.post(`${base}/user/register`, formData);
          console.log("Registration successful", res.data);
          toast.success('Successfully Registered!');
          navigate('/');
        } catch (error) {
          if (error.response) {
            // Check the response status
            if (error.response.status === 401) {
              toast.error("User already exists!");
            } else {
              toast.error('An error occurred while registering. Please try again.');
              console.error('Error registering user:', error.response.data);
            }
          } else {
            toast.error('Network error or server not responding.');
            console.error('Error registering user:', error.message);
          }
          console.log(error)
        }
      };

    return (
        <div className='pt-32 max-w-6xl mx-auto flex justify-between items-center gap-2 rg'>
            
            

                 <div className='w-full h-screen register flex justify-center items-center'>
                 <div>
                 <Lottie className='w-[400px]' animationData={registerAn}></Lottie>
               </div>
                 {/*<div>
                   <img src="https://i.postimg.cc/MHL3Q2Sf/man-holding-sign-up-form-3d-illustration-download-in-png-blend-fbx-gltf-file-formats-signin-login-u.png" alt="Register Illustration" />
                 </div> */}
                 <div className='w-[35%] px-6 rounded-sm p-4 shadow-md bg-[#013650]'>
                   <h1 className='text-center text-3xl text-white font-bold'>Register</h1>
                   <form onSubmit={handleSubmit(onSubmit)}>
                     <label>
                       <h2 className='text-xl text-start text-white font-bold py-2'>FullName</h2>
                        <div className='flex bg-white items-center gap-3 px-4 rounded-md border '>
                        <FaUserEdit />
                        <input
                         className='text-sm text-gray-600 bg-none w-full font-semibold focus:outline-none p-2'
                         type="text"
                         {...register("fullname", {
                           required: "FullName is required",
                           minLength: { value: 3, message: "Name must be at least 3 characters" }
                         })}
                       />
                        </div>
                       {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                     </label>
                     <label>
                       <h2 className='text-xl text-start text-white font-bold py-2'>Username</h2>
                        <div className='flex bg-white items-center gap-3 px-4 rounded-md border '>
                        <FaUserEdit />
                        <input
                         className='text-sm text-gray-600 bg-none w-full font-semibold focus:outline-none p-2'
                         type="text"
                         {...register("username", {
                           required: "Username is required",
                           minLength: { value: 3, message: "Name must be at least 3 characters" }
                         })}
                       />
                        </div>
                       {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                     </label>
           
                     <label>
                       <h2 className='text-xl text-start text-white font-semibold py-2'>Email</h2>
                        <div className='flex bg-white items-center gap-3 px-4 rounded-md border '>
                        <MdEmail />
                        <input
                        className='text-sm w-full font-semibold focus:outline-none p-2'
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email address" }
                        })}
                      />
                        </div>
                       {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                     </label>
           
                     <label>
                       <h2 className='text-xl text-start text-white font-semibold py-2'>Password</h2>
                       <div className='flex items-center border bg-white px-2'>
                         <div className='flex bg-white items-center gap-3 px-4 rounded-md  '>
                         <TbPasswordMobilePhone />
                         <input
                         className='text-sm w-full text-gray-500 bg-none font-semibold focus:outline-none p-2 border-none'
                         type={pass ? "password" : "text"}
                         {...register("password", {
                           required: "Password is required",
                           minLength: { value: 6, message: "Password must be at least 6 characters" }
                         })}
                       />
                         </div>
                         <div onClick={handleEye} className='cursor-pointer'>
                           {pass ? <FaEyeSlash /> : <FaEye />}
                         </div>
                       </div>
                       {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                     </label>
           
                     <label>
                       <h1 className='text-xl text-start text-white font-semibold py-2'>Upload your picture</h1>
                       <Controller
                         name="image"
                         control={control}
                         render={({ field }) => (
                           <input
                             type="file"
                             accept="image/*"
                             className="text-sm w-full text-white font-semibold outline-none p-2"
                             onChange={e => {
                               field.onChange(e.target.files[0]);
                               postDetails(e.target.files[0]);
                             }}
                           />
                         )}
                       />
                     </label>
           
                     <input
                       className='block w-full p-2 hover:bg-orange-700 mt-2 cursor-pointer text-xl font-semibold bg-orange-500 text-white'
                       type="submit"
                       value="Register"
                       disabled={load}
                     />
                   </form>
                   <p className='text-xl text-white font-semibold my-3'>
                     Already have an account? <Link to='/login' className='font-bold underline text-xl'>Login</Link>
                   </p>
                 </div>
                 <Toaster />
               </div>
             </div>
       
    );
};

export default Register;