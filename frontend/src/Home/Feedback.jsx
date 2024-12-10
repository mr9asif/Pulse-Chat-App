import Lottie from 'lottie-react';
import ReactStars from "react-rating-stars-component";
import review from '../../src/assets/animations/review.json';

const Feedback = () => {
    
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

    return (
       <div className='bg-secondary '>
        
       <div className='flex justify-center gap-8 max-w-7xl mx-auto items-center my-2 px-14 p-5'>
       <div className='w-[50%]'>
         <form className='w-[90%] bg-gray-100 border-4 border-gray-300 hover:shadow-lg rounded-md hover:shadow-black p-8 ' action="">
         <h1 className='text-center text-red-500 py-2 text-2xl font-bold font-mono'>Give a Feedback & Review </h1>
           <label htmlFor="review">
            <input className='outline-none w-full border-none rounded p-3 text-sm focus:ouline-none font-mono text-gray-300' type="text" placeholder='Give a feedback to improve pulse..' />
            <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />,
           <button className='text-sm p-2 rounded-md bg-secondary hover:bg-base cursor-pointer hover:animate-pulse text-white border my-2'>Submit</button>
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