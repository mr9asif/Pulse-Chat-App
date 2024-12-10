import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';
import about from '../../src/assets/animations/about.json';
import '../App.css';

const AboutUs = () => {
    return (
        <div className='flex items-center justify-between my-5  '>
            <div className='w-[50%]'>
             <Lottie className='w-[600px]' animationData={about}></Lottie>
            </div>
            <div className='flex flex-col items-start gap-3'>
                  <h1 className='text-4xl font-mono text-red-500 font-bold'>ABOUT US</h1>
                  <p className='w-[80%]'>Pulse is built to make chatting easy, fast, and secure. Connect with confidence and enjoy the conversation.</p>
                  <Link to='/about' className='bn font-mono '>Read More</Link>
            </div>
        </div>
    );
};

export default AboutUs;