import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
import { io } from "socket.io-client";
import { UserContext } from "../Utils/AuthContext";

const ChatsArea = ({ messages, setMessages, receiverUser }) => {
  const { user } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const [media, setMedia] = useState(null); // State for file
  const base = import.meta.env.VITE_BASEURL;
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    if (!user || !receiverUser) return;

    const newSocket = io("http://localhost:4000", {
      query: { userId: user._id },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
      setSocketId(newSocket.id);
    });

    // Listen for new messages
    const messageListener = (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, timestamp: message.timestamp || new Date().toISOString() },
      ]);
    };

    newSocket.on("receiveMessage", messageListener);

    return () => {
      newSocket.off("receiveMessage", messageListener);
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user, receiverUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage.trim() && !media) return; // Ensure either text or media is present

    const formData = new FormData();
    formData.append("content", newMessage);
    if (media) formData.append("media", media);

    const messageData = {
      sender: user._id,
      receiver: receiverUser._id,
      content: newMessage || "", // Text content
      media: media ? media.name : null, // Only send filename to socket
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${base}/msg/${receiverUser._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // Emit message via Socket.IO
      socket.emit("sendMessage", messageData);

      // Update UI instantly
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
      setMedia(null);
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  // Function to categorize timestamps
  const processMessages = (messages) => {
    const currentDate = new Date();

    const getCategory = (timestamp) => {
      const messageDate = new Date(timestamp);
      if (isNaN(messageDate)) return "Invalid Date";

      const isSameDay = (d1, d2) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

      if (isSameDay(messageDate, currentDate)) return "Today";

      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);

      if (isSameDay(messageDate, yesterday)) return "Yesterday";

      return messageDate.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };

    return messages.reduce((groups, msg) => {
      const category = getCategory(msg.timestamp);
      if (!groups[category]) groups[category] = [];
      groups[category].push(msg);
      return groups;
    }, {});
  };

  const groupedMessages = processMessages(messages);

  return (
    <div className="chat-area">
      {/* Chat Messages */}
      <div className="h-[calc(100vh-137px)] overflow-y-auto">
        {Object.keys(groupedMessages).map((dateKey) => (
          <div key={dateKey}>
            <div className="text-center text-gray-500 my-2">{dateKey}</div>
            {groupedMessages[dateKey].map((msg, index) => {
              const isSender = msg.sender === user._id;
              return (
                <div key={index} className={`flex items-center gap-2 p-2 w-full ${isSender ? "justify-end" : "justify-start"}`}>
                  {!isSender && (
                    <img className="w-[50px] h-[50px] rounded-full" src={receiverUser?.image || "https://via.placeholder.com/50"} alt="Profile" />
                  )}

                  <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
                    <div className={`chat-header ${isSender ? "text-right" : "text-left"} flex items-center gap-3`}>
                      {isSender ? "You" : receiverUser?.fullname || "Unknown User"}
                      <time className="text-xs opacity-50">{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                    </div>

                    {/* Render text or media */}
                    {msg.content && <div className="chat-bubble">{msg.content}</div>}
                    {msg.media && (
                        <div className="">
                          <img src={`${base}/uploads/${msg.media}`} alt="media" className="rounded-md" width="200" />
                        </div>
                      )}
                      

                    <div className="chat-footer opacity-50">Seen</div>
                  </div>

                  {isSender && (
                    <img className="w-[50px] h-[50px] rounded-full" src={user?.image || "https://via.placeholder.com/50"} alt="Profile" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white p-1">
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-1">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="w-[70%] p-3 rounded-sm outline-none bg-gray-300 text-gray-800 font-mono"
          />
          <input type="file" onChange={(e) => setMedia(e.target.files[0])} className="hidden" id="mediaUpload" />
          <label htmlFor="mediaUpload" className="cursor-pointer px-3 py-2 bg-gray-200 rounded-md">📎</label>
          <button type="submit">
            <LuSend className="text-3xl text-red-600 cursor-pointer hover:text-blue-600" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatsArea;
