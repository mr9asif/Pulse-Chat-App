import React, { useContext } from 'react';
import { LuSend } from "react-icons/lu";
import { UserContext } from '../Utils/AuthContext';

const ChatsArea = ({ messages, receiverUser }) => {
    const { user } = useContext(UserContext);

    // Function to format and categorize timestamps
    const processMessages = (messages) => {
        const currentDate = new Date();

        const getCategory = (timestamp) => {
            const messageDate = new Date(timestamp);

            if (isNaN(messageDate)) return "Invalid Date";

            const isSameDay = (d1, d2) =>
                d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();

            if (isSameDay(messageDate, currentDate)) {
                return "Today";
            }

            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);

            if (isSameDay(messageDate, yesterday)) {
                return "Yesterday";
            }

            return messageDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        };

        // Group messages by category
        const groupedMessages = messages.reduce((groups, msg) => {
            const category = getCategory(msg.timestamp);
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(msg);
            return groups;
        }, {});

        return groupedMessages;
    };

    const groupedMessages = processMessages(messages);

    return (
        <div className="chat-area">
            {/* Chat Messages */}
            <div className="h-[calc(100vh-137px)] overflow-y-auto">
                {Object.keys(groupedMessages).map((dateKey) => (
                    <div key={dateKey}>
                        {/* Date Header */}
                        <div className="text-center text-gray-500 my-2">{dateKey}</div>
                        {/* Messages */}
                        {groupedMessages[dateKey].map((msg) => {
                            const isSender = msg.sender === user._id; // Determine if the user is the sender
                            return (
                                <div
                                    key={msg._id}
                                    className={`flex items-center gap-2 p-2 w-full ${
                                        isSender ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    {/* Profile Image */}
                                    {!isSender && (
                                        <img
                                            className="w-[50px] h-[50px] rounded-full"
                                            src={receiverUser?.image || "https://via.placeholder.com/50"}
                                            alt="Profile"
                                        />
                                    )}

                                    {/* Message Content */}
                                    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                                        <div
                                            className={`chat-header ${
                                                isSender ? "text-right" : "text-left"
                                            } flex items-center gap-3`}
                                        >
                                            {isSender ? "You" : receiverUser?.fullname || "Unknown User"}
                                            <time className="text-xs opacity-50">
                                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </time>
                                        </div>
                                        <div className="chat-bubble">{msg.content}</div>
                                        <div className="chat-footer opacity-50">Seen</div>
                                    </div>

                                    {/* Placeholder for Sender Profile Image */}
                                    {isSender && (
                                        <img
                                            className="w-[50px] h-[50px] rounded-full"
                                            src={user?.image || "https://via.placeholder.com/50"}
                                            alt="Profile"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
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
