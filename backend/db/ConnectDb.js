const mongoose = require('mongoose');

const ConnectDb = async()=>{
    const uri = process.env.MONGODB_URL;
    
      try {
        mongoose.connect(uri);
        console.log("Mongodb Connect Successfully!")
        
      } catch (error) {
        console.log("db connect server error")
    
      }
}

module.exports= ConnectDb;