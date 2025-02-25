import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { TbSquareToggleHorizontal } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../assets/Images/icons8-pulse-32.png";

import { SocketContext } from "../Socket/SocketContext";
import { UserContext } from "../Utils/AuthContext";
import Chats from "./Chats";
import ChatsArea from "./ChatsArea";
import Groups from "./Groups";

const Messages = () => {
    const [activeTab, setActiveTab] = useState("Chat");
    const base = import.meta.env.VITE_BASEURL;
    const [searchUsers, setSearchUsers] = useState([]);
    const [isSearching, setIsSearching] = useState(false); // Search state
    const [searchTerm, setSearchTerm] = useState(""); // Controlled input state
    const [chatReceiverId, setChatRecieverId]=useState(null);
    const [select, setSelect]=useState(null)
      
    const {user,}=useContext(UserContext);
    const [receiverUser, setreceiverUser]=useState(null);
    const [messages, setMessages]=useState([]);
    const [toggle, setToggle]=useState(false);
    // console.log(receiverUser, messages)
    // console.log(user)
    const [online, setOnline]=useState(null);
    // console.log(online)

    const {onlineUsers}= useContext(SocketContext);
      
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    

//   console.log(receiverUser)
    

    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setIsSearching(false);
                setSearchUsers([]);
                return;
            }

            const searchUsers = async () => {
                setIsSearching(true);
                try {
                    const res = await axios.get(
                        `${base}/user/searchUsers?search=${searchTerm.trim()}`, 
                        { withCredentials: true }
                    );
                    setSearchUsers(res.data.users);
                } catch (error) {
                    console.error(error);
                }
            };

            searchUsers();
        }, 300); // Adjust debounce delay as needed (300ms in this case)

        return () => clearTimeout(timeout); // Cleanup debounce
    }, [searchTerm]);

    const handleOnlineUsers = ()=>{
        setToggle(!toggle);
          setOnline(onlineUsers)
    }
    // console.log(toggle)

    const handleChat = async (id) => {
        console.log('User ID:',user._id);
        setSelect(id);
        // console.log('Receiver ID:', id);
    
        try {
            // Send userId and receiverId as query parameters in the URL
            const res = await axios.get(`${base}/msg/user`, {
                params: {
                    userId: user._id,
                    receiverId: id,
                },
                
            });
            // console.log(res.data);  // Log the response (messages and user details)
            setreceiverUser(res.data.user);
            setMessages(res.data.messages);

            setChatRecieverId(id);
        } catch (error) {
            console.error('Error fetching chat data:', error);
        }
    };
    

  // In your Messages component

return (
    <div className="flex">
        {/* Left side */}
        <div className="w-[35%] bg-secondary h-[100vh]">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-6 h-[80px] border-b-2 mb-6">
                <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-4 cursor-pointer hover:scale-105 hover:animate-pulse">
                        <img width={30} className="" src={logo} alt="logo" />
                        <h1 className="text-[#ED0049] text-2xl font-bold">Pulse</h1>
                    </div>
                    <Link className="text-xl text-white cursor-pointer" to="/">
                        <FaArrowLeft />
                    </Link>
                </div>

                {/* Online Users Toggle Button */}
                <div 
                    onClick={handleOnlineUsers} 
                    title="Online Users" 
                    className={`text-2xl text-white cursor-pointer ${toggle ? " text-green-500" : ""}`}
                >
                    <BsFillPeopleFill />
                </div>

                {/* Theme Toggle */}
                <div title="Theme" className="text-2xl text-white cursor-pointer">
                    <TbSquareToggleHorizontal />
                </div>
            </div>

            {/* Search bar */}
            <div className="w-[92%] mx-auto flex items-center my-4 h-[30px]">
                <form className="w-full border-t-2 border-b-2 border-white rounded-md">
                    <label className="flex items-center w-full bg-white">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search Users"
                            className="outline-none bg-none font-mono py-2 px-2 w-[100%] border-none box-border h-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Trigger search on typing
                        />
                    </label>
                </form>
            </div>

            {/* Tab for user and group */}
            <div className="w-full h-[40px]">
                <div
                    role="tablist"
                    className="tabs tabs-bordered tabs-lg text-white w-full flex font-mono"
                >
                    <button
                        role="tab"
                        className={`${
                            activeTab === "Chat" && "border-b-2 z-10 text-red-500 "
                        } pb-2 tab flex-1 text-center ${activeTab === "Chat" ? "tab-active" : ""}`}
                        onClick={() => handleTabClick("Chat")}
                    >
                        Chats
                    </button>
                    <button
                        role="tab"
                        className={`${
                            activeTab === "Group" && "border-b-2 text-red-500"
                        } pb-2 tab flex-1 text-center ${activeTab === "Group" ? "tab-active" : ""}`}
                        onClick={() => handleTabClick("Group")}
                    >
                        Groups
                    </button>
                </div>
            </div>

            {/* Display content based on toggle state */}
            <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
                {toggle ? (
                    // When toggle is true, show online users
                    <>
                        <div className=" p-4 bg-gray-400 ">
                            <h1 className="text-white mb-2">Online Users</h1>
                            {online && online.map((user) => (
                                <div
                                 onClick={()=>handleChat(user._id)}
                                    key={user._id}
                                    className="flex items-center gap-3 mb-4 p-4 bg-gray-200 rounded-lg"
                                >
                                <div className='relative'>
                                <img className='w-[60px] rounded-[50%] h-[60px]' src={`${user.image}`} alt={user.fullname} />
                                <div className='w-[10px] h-[10px] rounded-[50%] bg-green-500 absolute top-2 right-0'></div>
                              </div>
                                    <h1 className="text-2xl font-mono font-bold text-red-500">{user.fullname}</h1>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // When toggle is false, show search or chat users
                    isSearching ? (
                        searchUsers.length > 0 ? (
                            searchUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center mb-4 p-2 bg-gray-200 rounded-lg"
                                >
                                    <img
                                        className="w-12 h-12 rounded-full mr-4"
                                        src={user.image}
                                        alt={user.fullname}
                                    />
                                    <h1 className="text-lg font-bold">{user.fullname}</h1>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 mt-4">No users found</div>
                        )
                    ) : (
                        // Show default Chats or Groups when not searching
                        <>
                            {activeTab === "Chat" && <Chats handleChat={handleChat} />}
                            {activeTab === "Group" && <Groups />}
                        </>
                    )
                )}
            </div>
        </div>

        {/* Right side */}
        <div className="w-[70%] h-[100vh] bg-green-600">
            {/* Top */}
            <div className="flex items-center w-full justify-start gap-3 px-8 bg-gray-100 h-[80px]">
                <img
                    className="w-[50px] h-[50px] rounded-[50%]"
                    src={receiverUser?.image}
                    alt=""
                />
                <div className="flex flex-col items-start justify-center gap-0">
                    <h1 className="text-2xl font-mono font-bold text-red-500">{receiverUser?.fullname}</h1>
                    <p className="text-[13px] text-gray-400 font-mono">Offline</p>
                </div>
            </div>

            {/* Chats area */}
            {select ? (
                <ChatsArea
                    chatReceiverId={chatReceiverId}
                    messages={messages}
                    setMessages={setMessages}
                    receiverUser={receiverUser}
                />
            ) : (
                <div className="text-center mt-[260px] my-auto">Select Someone to Chat</div>
            )}
        </div>
    </div>
);

};

export default Messages;
