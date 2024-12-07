import Lottie from 'lottie-react';
import '../App.css';
import animate from '../assets/animations/msg2.json';

const Banner = () => {
    return (
        <div className=' gap-2 pt-[150px] px-4 rg h-[700px]'>
            <div className='flex flex-col justify-center items-center gap-3 bg-gray-500'>
               <h1 className='text-3xl font-bold text-blue-700'>Welcome to Pulse</h1>
               <h1 className='text-3xl font-bold text-blue-700'>Chat with your Friends</h1>
            </div>
            <div>
            <div className=''>
            <Lottie className="text-blue-600" animationData={animate} ></Lottie>
            </div>
            </div>
        </div>
    );
};

export default Banner;