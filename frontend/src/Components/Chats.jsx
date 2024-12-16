import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Chats = ({handleChat}) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoadin]=useState(true);
  const base = import.meta.env.VITE_BASEURL;

 

  useEffect(() => {
    const chatMsgs = async () => {
      try {
        const res = await axios.get(`${base}/msg/getChats`, { withCredentials: true });
        setChats(res.data.users); // Assuming `res.data.users` is an array of chat objects
        setLoadin(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setLoadin(false)
      }
    };
    chatMsgs();
  }, [base]);
  if(loading){
    return <Skeleton className='h-[70px] mb-3' count={4} /> // Five-line loading skeleton
 };

    

  return (
    <div className=''>
      {chats?.map((chat) => (
        <div onClick={()=>handleChat(chat._id)}
          className='flex items-start mb-2 justify-start cursor-pointer pl-10 rounded-md py-2 gap-6 bg-gray-200'
          key={chat.id} // Always include a unique key prop
        >
          <div className='relative'>
            <img className='w-[60px] rounded-[50%] h-[60px]' src={`${chat.image}`} alt={chat.fullname} />
            <div className='w-[10px] h-[10px] rounded-[50%] bg-green-500 absolute top-2 right-0'></div>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <h1 className='text-2xl font-bold font-mono text-red-500'>{chat.fullname}</h1>
            <p className='text-[14px] text-gray-500 font-mono'>last message</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
