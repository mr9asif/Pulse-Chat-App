import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TbSquareToggleHorizontal } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../assets/Images/icons8-pulse-32.png";

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
                <div className="flex items-center justify-between px-6 py-6 border-b-2 mb-6">
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
                <div className="w-full flex items-center my-4">
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
                <div className="w-full">
                    <div role="tablist" className="tabs tabs-bordered tabs-lg text-white w-full flex font-mono">
                        <button
                            role="tab"
                            className={`${activeTab === "Chat" && "border-b-2 text-red-500 "} pb-2 tab flex-1 text-center ${
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
                <div className="p-4">
                    {activeTab === "Chat" && <div className="bg-white text-red-400">Chat Content</div>}
                    {activeTab === "Group" && <div className="bg-white text-red-400">Group Content</div>}
                </div>
            </div>

            {/* Right side */}
            <div className="w-[60%]"></div>
        </div>
    );
};

export default Messages;
