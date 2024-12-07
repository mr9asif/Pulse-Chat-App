import Banner from "./Banner";
const base = import.meta.env.VITE_BASEURL;
console.log(base)

const Home = () => {
    return (
        <div className='max-w-8xl mx-auto  '>
          <Banner></Banner>
        </div>
    );
};

export default Home;
