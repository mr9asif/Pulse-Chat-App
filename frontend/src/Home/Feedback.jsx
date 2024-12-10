import axios from 'axios';
import Lottie from 'lottie-react';
import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom';
import review from '../../src/assets/animations/review.json';
import { UserContext } from '../Utils/AuthContext';

const Feedback = () => {
  const [r, setR] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const base = import.meta.env.VITE_BASEURL;

  const handleReview = async (e) => {
    e.preventDefault();

    const review = e.target.review.value;

    if (!user) {
      toast.error('Please create an account first!');
      navigate('/login');
      return;
    }

    const UserReview = { review, r, user };

    try {
      const res = await axios.post(`${base}/reviews/sendReviews`, UserReview);
      if (res.status === 201) {
        toast.success('Review submitted successfully!');
        e.target.reset(); // Clear the form
        setR(null); // Reset the rating
      } else {
        toast.error('Failed to submit the review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('An error occurred while submitting your review.');
    }
  };

  const ratingChanged = (newRating) => {
    setR(newRating);
  };

  return (
    <div className="bg-secondary">
      <div className="flex justify-center gap-8 max-w-7xl mx-auto items-center my-2 px-14 p-5">
        <div className="w-[50%]">
          <form
            onSubmit={handleReview}
            className="w-[90%] bg-gray-100 border-4 border-gray-300 hover:shadow-lg rounded-md hover:shadow-black p-8"
          >
            <h1 className="text-center text-red-500 py-2 text-2xl font-bold font-mono">
              Give a Feedback & Review
            </h1>
            <label htmlFor="review">
              <input
                name="review"
                required
                className="outline-none w-full border-none rounded p-3 text-sm focus:outline-none font-mono text-gray-300"
                type="text"
                placeholder="Give a feedback to improve pulse.."
              />
              <ReactStars
                count={5}
                required
                onChange={ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              <button className="text-sm p-2 rounded-md bg-secondary hover:bg-base cursor-pointer hover:animate-pulse font-mono text-white border my-2">
                Submit
              </button>
            </label>
          </form>
        </div>
        <div>
          <Lottie className="w-[400px]" animationData={review}></Lottie>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Feedback;
