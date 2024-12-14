import React from 'react';
import { FaRocketchat } from "react-icons/fa6";

const Groups = () => {
    return (
        <div>
        <div className='flex mb-2 items-start justify-start pl-10 rounded-md py-2 gap-6 bg-gray-200 '>
        <div className='relative'>
        <img className='w-[60px] rounded-[50%] h-[60px]' src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="" />
        <FaRocketchat  className='text-2xl text-red-600 absolute bottom-0' />
        </div>
         <div className='flex flex-col items-start justify-center'>

           <h1 className='text-2xl font-bold font-mono text-red-500'>Team ninja</h1>
            <p className='text-[14px] text-gray-500 font-mono'>last message</p>
         </div>
       </div>
        </div>
    );
};

export default Groups;