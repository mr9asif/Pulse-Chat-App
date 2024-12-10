
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import Feedback from "./Feedback";


const Home = () => {
    return (
        <div className='max-w-8xl mx-auto  '>
          <Banner></Banner>
        {/* features aboutus, feedback testimonial , footer */}
        <AboutUs></AboutUs>

        <Feedback></Feedback>
        </div>
    );
};

export default Home;
