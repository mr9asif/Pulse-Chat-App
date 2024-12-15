import React from 'react';
import { LuSend } from "react-icons/lu";

const ChatsArea = () => {
    const isSender = true; // Change this dynamically to simulate sender or receiver
    const isReceiver = true;
    return (
       <div className=''>
         <div className='h-[calc(100vh-137px)] overflow-y-auto'>
         <div className={`flex items-center gap-2 p-2 w-full ${
          isSender ? "justify-end" : "justify-start"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isSender ? "order-2" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex flex-row-reverse gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div>
  
       {/* -----------*/}
       <div className={`flex items-center gap-2 p-2 w-full ${
          isReceiver ? "justify-start" : "justify-end"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isReceiver ? "order-0" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex items-start gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div>
  
      {/* -----------*/}
      <div className={`flex items-center gap-2 p-2 w-full ${
          isReceiver ? "justify-start" : "justify-end"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isReceiver ? "order-0" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex items-start gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div>
  
      {/* -----------*/}
      <div className={`flex items-center gap-2 p-2 w-full ${
          isReceiver ? "justify-start" : "justify-end"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isReceiver ? "order-0" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex items-start gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div>
  
      {/* -----------*/}
      <div className={`flex items-center gap-2 p-2 w-full ${
          isReceiver ? "justify-start" : "justify-end"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isReceiver ? "order-0" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex items-start gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div><div className={`flex items-center gap-2 p-2 w-full ${
          isSender ? "justify-end" : "justify-start"
      }`}>
          {/* Profile Image */}
          <img
              className={`w-[50px] h-[50px] rounded-full ${isSender ? "order-2" : "order-1"}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3WEmfJCME77ZGymWrlJkXRv5bWg9QQmQEzw&s"
              alt="Profile"
          />
          
          {/* Message Content */}
          <div className="chat chat-end">
          <div className="chat-header flex flex-row-reverse gap-3">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">2 hours ago</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
        
      </div>
         </div>

         {/* send msg*/}
         <div className='bg-white   p-1'>
             <form className='flex items-center justify-center gap-1' action="">
                <input type="text" placeholder='send a message..' className='w-[80%] p-3 rounded-sm outline-none bg-gray-300 text-gray-800 font-mono' />
                <LuSend className='text-3xl text-red-600 cursor-pointer hover:text-blue-600' />
             </form>
         </div>
       </div>
    );
};

export default ChatsArea;
