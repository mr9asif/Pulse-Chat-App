import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';
import about from '../../src/assets/animations/about.json';
import '../App.css';

const AboutUs = () => {
    return (
        <div className='flex items-center justify-between my-5 '>
            <div>
             <Lottie className='w-[600px]' animationData={about}></Lottie>
            </div>
            <div className='flex flex-col items-start gap-3'>
                  <h1 className='text-[35px] font-mono text-base font-bold'>ABOUT US</h1>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, eius? Incidunt soluta deserunt dolores.</p>
                  <Link to='/about' className='bn '>Read More</Link>
            </div>
        </div>
    );
};

export default AboutUs;