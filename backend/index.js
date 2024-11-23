const express = require('express');
const cors = require("cors");
require('dotenv').config();
const port =process.env.PORT || 4001;
console.log(process.env.PORT)

const app = express();

app.get('/', (req,res)=>{
    res.send({message:"works "})
})


app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})