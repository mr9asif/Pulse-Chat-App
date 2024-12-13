
import { FaArrowLeft } from "react-icons/fa";
import { TbSquareToggleHorizontal } from "react-icons/tb";
import { Link } from 'react-router-dom';
import logo from '../assets/Images/icons8-pulse-32.png';

const Messages = () => {
    return (
        <div>
            {/* Left side */}
            <div className='w-[35%] bg-secondary h-[100vh]'>
            {/* top bar*/}
                 <div className='flex items-center justify-between px-6 py-6 border-b-2 mb-6'>
                      <div className='flex items-center justify-center gap-3 '>
                      <div className="flex items-center justify-center gap-4 cursor-pointer hover:scale-105 hover:animate-pulse">
                      <img width={30} className="" src={logo} alt="logo" />
                      <h1 className="text-[#ED0049] text-2xl font-bold">Pulse</h1>
                       </div>
                       <Link className='text-xl text-white cursor-pointer'  to='/'><FaArrowLeft /></Link>
                       
                      </div>

                      <div  title='Theme' className='text-2xl text-white cursor-pointer'>
                      <TbSquareToggleHorizontal />
                       </div>
                     
                 </div>

                 {/* search bar*/}
                 <div className="w-full flex items-center my-4">
                 <form className="w-full border-t-2 border-b-2 border-white rounded-md" action="">
                     <label className="flex items-center w-full" htmlFor="">
                         <input 
                             type="text" 
                             placeholder="Search Users" 
                             className="outline-none py-2 px-2 w-[75%] border-none box-border h-full"
                         />
                         <input 
                             className="w-[25%] h-full text-white font-mono px-2 py-2 bg-secondary hover:bg-base cursor-pointer box-border"
                             type="submit"
                         />
                     </label>
                 </form>
             </div>
             
            </div>
            <div className='w-[60%]'>
            </div>
        </div>
    );
};

export default Messages;