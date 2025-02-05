const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ConnectDb = require('./db/ConnectDb');
require('dotenv').config();
const port =process.env.PORT || 4001;
const {server, app}= require('./Socket/socket')

const UserRoutes = require("./Routes/UserRoutes");
const MessageRoutes = require('./Routes/MessageRoutes');
const ReviewsRoutes = require('./Routes/ReviewsRoutes');





// skdlfdkfldf
// dfkdllfd
// jkkjk
// jkjkkjkjkk
// kkkkkkkkkkkkkkkkk
// skdlfdkfldf
// dfkdllfd
// jkkjk
// jkjkkjkjkk
// kkkkkkkkkkkkkkkkk


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
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