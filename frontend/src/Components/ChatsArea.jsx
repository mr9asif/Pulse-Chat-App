import React, { useContext } from 'react';
import { LuSend } from "react-icons/lu";
import { UserContext } from '../Utils/AuthContext';

const ChatsArea = ({ messages, receiverUser }) => {
    const { user } = useContext(UserContext);

    // Function to format timestamps
    const formatTimestamp = (createdAt) => {
        const messageDate = new Date(createdAt);
        const currentDate = new Date();

        const messageDay = messageDate.getDate();
        const messageMonth = messageDate.getMonth();
        const messageYear = messageDate.getFullYear();

        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        if (messageYear === currentYear && messageMonth === currentMonth && messageDay === currentDay) {
            return "Today";
        }

        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);

        if (messageYear === yesterday.getFullYear() && messageMonth === yesterday.getMonth() && messageDay === yesterday.getDate()) {
            return "Yesterday";
        }

        return messageDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="chat-area">
            {/* Chat Messages */}
            <div className="h-[calc(100vh-137px)] overflow-y-auto">
                {messages.map((msg) => {
                    const isSender = msg.sender === user._id; // Determine if the user is the sender
                    return (
                        <div
                            key={msg._id}
                            className={`flex items-center gap-2 p-2 w-full ${isSender ? "justify-end" : "justify-start"}`}
                        >
                            {/* Profile Image */}
                            {!isSender && (
                                <img
                                    className="w-[50px] h-[50px] rounded-full"
                                    src={receiverUser?.image}
                                    alt="Profile"
                                />
                            )}

                            {/* Message Content */}
                            <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                                <div className={`chat-header ${isSender ? "text-right" : "text-left"} flex items-center gap-3`}>
                                    {isSender ? "You" : receiverUser?.fullname || "Unknown User"}
                                    <time className="text-xs opacity-50">{formatTimestamp(msg.createdAt)}</time>
                                </div>
                                <div className="chat-bubble">{msg.content}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>

                            {/* Placeholder for Sender Profile Image */}
                            {isSender && (
                                <img
                                    className="w-[50px] h-[50px] rounded-full"
                                    src={user?.image}
                                    alt="Profile"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Message Input */}
            <div className="bg-white p-1">
                <form className="flex items-center justify-center gap-1">
                    <input
                        type="text"
                        placeholder="Send a message..."
                        className="w-[80%] p-3 rounded-sm outline-none bg-gray-300 text-gray-800 font-mono"
                    />
                    <LuSend className="text-3xl text-red-600 cursor-pointer hover:text-blue-600" />
                </form>
            </div>
        </div>
    );
};

export default ChatsArea;
