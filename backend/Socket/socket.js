const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const User = require("../Models/User.model"); // Adjust path based on your project structure

const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"],
    },
});



const userOnlineMap = {}; // Store online users

io.on("connection", async (socket) => {
    console.log("User connected", socket.id);

    const { userId } = socket.handshake.query;
    if (userId) {
        if (!userOnlineMap[userId]) {
            userOnlineMap[userId] = [];
        }
        userOnlineMap[userId].push(socket.id); // Store socket ID under user ID

        console.log("Updated Online Users:", userOnlineMap);
    }

    // socket.on('sendMessage', (msg)=>{
    //     console.log(msg)
    // })
    
      
    

    // Listen for a new message
  // Listen for a new message
socket.on("sendMessage", (message) => {
    const { sender, receiver } = message;

    // Find the socket IDs for the sender and receiver using their userId
    const senderSocketIds = userOnlineMap[sender]; // Get sender's socket IDs
    const receiverSocketIds = userOnlineMap[receiver]; // Get receiver's socket IDs
 console.log("sender:", senderSocketIds);
 console.log("reci:", receiverSocketIds);
    // Emit the message to the sender's socket(s)
    if (senderSocketIds) {
        senderSocketIds.forEach((socketId) => {
            io.to(socketId).emit("receiveMessage", message);
        });
    }

    // Emit the message to the receiver's socket(s)
    if (receiverSocketIds) {
        receiverSocketIds.forEach((socketId) => {
            io.to(socketId).emit("receiveMessage", message);
        });
    }

    console.log("Message sent:", message);
});



    if (userId) {
        if (!userOnlineMap[userId]) {
            userOnlineMap[userId] = [];
        }
        userOnlineMap[userId].push(socket.id); // Store multiple connections for the same user

        // console.log("Online Users:", Object.keys(userOnlineMap));

        // Fetch user details and emit updated online users list
        await sendOnlineUsers();
    }

    socket.on("disconnect", async () => {
        console.log("User disconnected", socket.id);

        if (userId && userOnlineMap[userId]) {
            // Remove the socket ID from the array
            userOnlineMap[userId] = userOnlineMap[userId].filter((id) => id !== socket.id);

            // If no sockets are left for this userId, remove the userId from the map
            if (userOnlineMap[userId].length === 0) {
                delete userOnlineMap[userId];
            }

            console.log("Updated userOnlineMap after disconnect:", userOnlineMap);

            // Fetch user details and emit updated online users list
            await sendOnlineUsers();
        }
    });
});

/**
 * Fetch user details from DB and send online users to frontend
 */
async function sendOnlineUsers() {
    try {
        const userIds = Object.keys(userOnlineMap); // Get array of user IDs from the map

        // Filter out invalid userIds before converting them to ObjectId
        const validUserIds = userIds.filter(id => mongoose.Types.ObjectId.isValid(id));

        // Convert valid userIds to ObjectId
        const objectIds = validUserIds.map(id => new mongoose.Types.ObjectId(id));

        // Fetch user details from the database using .lean() for plain JavaScript objects
        const users = await User.find({ _id: { $in: objectIds } })
            .select("fullname username image email") // Select specific fields
            .lean(); // Use lean() to get plain JavaScript objects

        // Emit the full user details to all connected clients
        io.emit("onlineUsers", users);
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
}



module.exports = { server, io, app };
