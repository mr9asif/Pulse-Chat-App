const express = require('express');
const http = require('http');
const app = express();

const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// sdlklkdf
// dfdff
// dfffffff
// lskdlkf
// sdlkfdlfk

const userOnlineMap = {};
io.on('connection', (socket) => {
    console.log("User connected", socket.id);

    const {userId} = socket.handshake.query;
    console.log("userid", userId)
    // console.log("userId", userId)
    // if (userId !== "undefined") userOnlineMap[userId] = socket.id;
    //   console.log(Object.keys(userOnlineMap))

    if(userId){
        if(!userOnlineMap[userId]){
            userOnlineMap[userId]=[];
        }
        userOnlineMap[userId].push=socket.id;
       
        console.log(Object.keys(userOnlineMap))
        io.emit('onlineUsers', Object.keys(userOnlineMap));
    }


    socket.on('disconnect', () => { // Corrected spelling here
        console.log("User disconnected", socket.id);

       
    if (userId && userOnlineMap[userId]) {
        // Remove the socket.id from the array
        userOnlineMap[userId] = userOnlineMap[userId].filter(id => id !== socket.id);
  
        // If no sockets are left for this userId, remove the userId from the map
        if (userOnlineMap[userId].length === 0) {
          delete userOnlineMap[userId];
        }
  
        console.log("Updated userOnlineMap after disconnect:", userOnlineMap);
  
        // Emit the updated list of unique user IDs to all clients
        io.emit("onlineUsers", Object.keys(userOnlineMap));
      }
    });
});

module.exports = {server, io, app}

