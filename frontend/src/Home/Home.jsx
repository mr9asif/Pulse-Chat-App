
import AboutUs from "./AboutUs";
import Banner from "./Banner";


const Home = () => {
    return (
        <div className='max-w-8xl mx-auto  '>
          <Banner></Banner>
        {/* features aboutus, feedback testimonial , footer */}
        <AboutUs></AboutUs>
        </div>
    );
};

export default Home;
