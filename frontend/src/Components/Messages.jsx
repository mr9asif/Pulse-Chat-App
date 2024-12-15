import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TbSquareToggleHorizontal } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../assets/Images/icons8-pulse-32.png";
import Chats from "./Chats";
import ChatsArea from "./ChatsArea";
import Groups from "./Groups";

const Messages = () => {
    // State to track the active tab
    const [activeTab, setActiveTab] = useState("Chat");

    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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

                    <div title="Theme" className="text-2xl text-white cursor-pointer">
                        <TbSquareToggleHorizontal />
                    </div>
                </div>

                {/* Search bar */}
                <div className="w-full flex items-center my-4 h-[30px]">
                    <form
                        className="w-full border-t-2 border-b-2 border-white rounded-md"
                        action=""
                    >
                        <label className="flex items-center w-full bg-white" htmlFor="">
                            <input
                                type="text"
                                placeholder="Search Users"
                                className="outline-none bg-none font-mono py-2 px-2 w-[75%] border-none box-border h-full"
                            />
                            <input
                                className="w-[25%] h-full text-white font-mono px-2 py-2 bg-secondary hover:text-base hover:scale-160 cursor-pointer box-border"
                                type="submit" value="Search"
                            />
                        </label>
                    </form>
                </div>

                {/* Tab for user and group */}
                <div className="w-full h-[40px]">
                    <div role="tablist" className="tabs tabs-bordered tabs-lg text-white w-full flex font-mono">
                        <button
                            role="tab"
                            className={`${activeTab === "Chat" && "border-b-2 z-10 text-red-500 "} pb-2 tab flex-1 text-center ${
                                activeTab === "Chat" ? "tab-active" : ""
                            }`}
                            onClick={() => handleTabClick("Chat")}
                        >
                            Chats
                        </button>
                        <button
                            role="tab"
                            className={`${activeTab === "Group" && "border-b-2 text-red-500"} pb-2 tab flex-1 text-center ${
                                activeTab === "Group" ? "tab-active" : ""
                            }`}
                            onClick={() => handleTabClick("Group")}
                        >
                            Groups
                        </button>
                    </div>
                </div>

                {/* Content for the active tab */}
                <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
                    {activeTab === "Chat" && <Chats className="overflow-auto"></Chats>}
                    {activeTab === "Group" && <Groups className></Groups>}
                </div>
            </div>

            {/* Right side */}
            <div className="w-[70%] h-[100vh] bg-green-600">
             {/* top */}
             <div className="flex items-center w-full justify-start gap-3 px-8 bg-gray-100 h-[80px]">
                <img className="w-[50px] h-[50px] rounded-[50%]" src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="" />
                <div className="flex flex-col items-start justify-center gap-0">
                   <h1 className="text-2xl font-mono font-bold text-red-500">Name</h1>
                   <p className="text-[13px] text-gray-400 font-mono">Offline</p>
                </div>
             </div>

             {/* chats area */}
             <ChatsArea className="h-[calc(100vh-180px)]"></ChatsArea>
            
            </div>
        </div>
    );
};

export default Messages;
