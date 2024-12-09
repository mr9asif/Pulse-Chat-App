import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import '../App.css';
import animate from '../assets/animations/home2.json';

const Banner = () => {
    return (
        <div className=' gap-2  px-20 rg h-[700px] flex justify-between items-center'>
            <div className='flex flex-col w-[80%]  justify-center items-center gap-4'>
            <TypeAnimation className='text-white font-bold font-mono'
            sequence={[
              // Same substring at the start will only be typed out once, initially
              ' 💬 Welcome to Pulse',
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              ' Stay Connected, Stay Pulse',
              1000,
              '  Real-Time Chat',
              1000,
              'Your Conversations, Elevated',
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block', color:"text-red-700" }}
            repeat={Infinity}
          />
              
               <h1 className='text-2xl font-bold text-gray-400'>Experience real-time, secure, and seamless communication. </h1>
            <Link className='text-xl my-3 font-semibold px-4 py-3 border rounded-md bg-base hover:bg-secondary hover:text-white hover:animate-pulse'>Let's Chat</Link>
            </div>
            <div>
            <div className='w-[40%] border-red-700'>
            <Lottie className="text-blue-600 w-[500px]" animationData={animate} ></Lottie>
            </div>
            </div>
        </div>
    );
};

export default Banner;