const { genSalt, hash } = require("bcryptjs");
const User = require("../../Models/User.model");


const RegisterUser =async (req, res)=>{
   try {
    const {fullname, username, email, password}= req.body;

    // check fields
    if(!fullname, !username, !email, !password){
        res.status(400).json({message:"All fiels are requred"});
    }

    // check user exist or not
    const existUser = await User.findOne({email});
    if(existUser){
        res.status(400).json({message:"User Already Exist!"})
    }

    // hash pass
    const salt = await genSalt(10)
    const hashPass = await hash(password, salt);

    const newUser = new User({
        fullname, username, email, password:hashPass
    });

    // save user in database
    const user =await newUser.save();
    

    // response
    res.status(201).send({messge:"Register Successfully",
        user:{
            id:user._id,
            fullName:user.fullname,
            Username:user.username,
            email:user.email,
            password:user.password,
            bio:user.bio,
            image:user.image
        }
    } 
        
    )
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
   }

}

module.exports = RegisterUser;