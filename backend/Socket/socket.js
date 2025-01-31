const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const User = require("../Models/User.model"); // Adjust path based on your project structure

const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const userOnlineMap = {}; // Store online users

io.on("connection", async (socket) => {
    console.log("User connected", socket.id);

    const { userId } = socket.handshake.query;
    console.log("UserID:", userId);

    if (userId) {
        if (!userOnlineMap[userId]) {
            userOnlineMap[userId] = [];
        }
        userOnlineMap[userId].push(socket.id); // Store multiple connections for the same user

        console.log("Online Users:", Object.keys(userOnlineMap));

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

        // Convert string IDs to ObjectId type correctly using 'new'
        const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));

        // Fetch user details from the database using .lean() for plain JavaScript objects
        const users = await User.find({ _id: { $in: objectIds } })
            .select("fullname username image email") // Select specific fields
            .lean(); // Use lean() to get plain JavaScript objects

        // Emit the full user details
        console.log(users)
        io.emit("onlineUsers", users);
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
}


module.exports = { server, io, app };
