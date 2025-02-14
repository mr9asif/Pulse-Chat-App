const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const User = require("../Models/User.model");

const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5175"],
        methods: ["GET", "POST"],
    },
});

const userOnlineMap = {}; // Store online users (only one socket per user)

io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    const { userId } = socket.handshake.query;

    if (userId && userId !== "undefined") {
        userOnlineMap[userId] = socket.id; // Store only the latest socket ID
    }

     const receiveid ="6766cf19ad1438890b74450d";
    //  console.log("f",userOnlineMap[receiveid])3
    
    console.log("Updated Online Users:", userOnlineMap); // ✅ Now prints the actual online users
    await sendOnlineUsers();



      // **Listen for "sendMessage" event and forward it to the receiver**
      socket.on("sendMessage", ({ sender, receiver, content, media }) => {
        console.log("rec", receiver)
        console.log(`Message from ${sender} to ${receiver}:`, content);
        
        const receiverSocketId = userOnlineMap[receiver];
        console.log(receiverSocketId)

        console.log("rc", receiverSocketId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", {
                sender,
                content,
                media
            });
            console.log(`Message sent to ${receiver} (socket: ${receiverSocketId})`);
        } else {
            console.log(`User ${receiver} is offline. Message not delivered.`);
        }
    });





    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);

        if (userId && userOnlineMap[userId] === socket.id) {
            delete userOnlineMap[userId]; // Remove user if they disconnect
        }

        console.log("Updated userOnlineMap after disconnect:", Object.keys(userOnlineMap)); // ✅ Updated after user disconnects
        await sendOnlineUsers();
    });
});

/**
 * Fetch user details from DB and send online users to frontend
 */
async function sendOnlineUsers() {
    try {
        const userIds = Object.keys(userOnlineMap).filter(id => mongoose.Types.ObjectId.isValid(id));
        
        console.log("now online: ", userIds); // ✅ Now prints online users every time it's called

        if (userIds.length === 0) return;

        const users = await User.find({ _id: { $in: userIds } })
            .select("fullname username image email")
            .lean();

        io.emit("onlineUsers", users);
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
}

module.exports = { server, io, app };
// kkkkkkkkkkkkkks
// dfldkfdlfkl
// dfldkfdlfk
// d,fdfdlfkdlfk