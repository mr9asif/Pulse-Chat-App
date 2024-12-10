const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ConnectDb = require('./db/ConnectDb');
require('dotenv').config();
const UserRoutes = require("./Routes/UserRoutes");
const MessageRoutes = require('./Routes/MessageRoutes');
const ReviewsRoutes = require('./Routes/ReviewsRoutes');



const port =process.env.PORT || 4001;
const app = express();

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


app.listen(port, ()=>{
    console.log(`server running on ${port}`)
    ConnectDb();
})