import Lottie from 'lottie-react';
import review from '../../src/assets/animations/review.json';

const Feedback = () => {
    return (
       <div className='bg-secondary '>
       <div className='flex justify-center gap-8 max-w-7xl mx-auto items-center my-4 px-14 p-5'>
       <div>
         <form action="">
           <label htmlFor="review">
            <input type="text" placeholder='Give a feedback to improve pulse..' />
           </label>
         </form>
       </div>
       <div>
           <Lottie className='w-[400px]' animationData={review}></Lottie>
       </div>
   </div>
       </div>
    );
};

export default Feedback;