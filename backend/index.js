const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ConnectDb = require('./db/ConnectDb');
require('dotenv').config();
const port =process.env.PORT || 4001;
const http = require('http');
const {Server}=require("socket.io");
const app = express();
const UserRoutes = require("./Routes/UserRoutes");
const MessageRoutes = require('./Routes/MessageRoutes');
const ReviewsRoutes = require('./Routes/ReviewsRoutes');

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust to your frontend's origin
        methods: ["GET", "POST"],
        credentials:true
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    console.log("Connected")
      // Example of sending data to the client
      socket.emit('welcome', 'Hello from the server!');

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});



// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}))

// user routes
app.use('/api/user', UserRoutes);

// message routes
app.use("/api/msg", MessageRoutes)

// reviews
app.use('/api/reviews', ReviewsRoutes)


server.listen(port, ()=>{
    console.log(`server running on ${port}`)
    ConnectDb();
})