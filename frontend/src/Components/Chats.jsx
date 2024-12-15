import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Chats = () => {
  const [chats, setChats]=useState([]);
  const base = import.meta.env.VITE_BASEURL;
        useEffect(()=>{
            const chatMsgs = async()=>{
              const res = await axios.get(`${base}/msg/getChats`, {withCredentials:true})
              console.log(res)
              setChats(res.data);
            }
            chatMsgs();
        },[base])

    return (
        <div className=''>
             {
              chats.map(chat=>{
                <div className='flex items-start mb-2 justify-start pl-10 rounded-md py-2 gap-6 bg-gray-200 '>
                <div className='relative'>
                       <img className='w-[60px] rounded-[50%] h-[60px]' src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="" />
                       
                        <div className='w-[10px] h-[10px] rounded-[50%] bg-green-500 absolute top-2 right-0'></div>
                       </div>
                 <div className='flex flex-col items-start justify-center'>
                   <h1 className='text-2xl font-bold font-mono text-red-500'>{chat.fullName}</h1>
                    <p className='text-[14px] text-gray-500 font-mono'>last message</p>
                 </div>
               </div>
              })
             }
          
        </div>
    );
};

export default Chats;