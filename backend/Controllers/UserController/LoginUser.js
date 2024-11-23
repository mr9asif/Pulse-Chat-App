const { compare } = require("bcryptjs");
const User = require("../../Models/User.model");
const generateToken = require("../../Utils/JwtToken");

const LoginUser = async(req, res)=>{
   try {
    const {email,username, password} = req.body;

    const emailOrusername = email || username;
     // Check if password is provided
     if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
  
      // Ensure at least email or username is provided
      if (!emailOrusername) {
        return res
          .status(400)
          .json({ message: "Please provide either an email or username" });
      }

    // check email or username in database
    const user = await User.findOne({
        $or:[{email:emailOrusername}, {username:emailOrusername}]
    })
    if(!user){
        res.status(400).json({message:"user not found"});
    }

    // bcrypt pass
    const matchPass = await compare(password, user.password)
    
    // !match
    if(!matchPass){
        res.status(400).json({message:"Incorrect Password"});
    }

    // generate token
    const token = generateToken(user._id);

    // set cookies
    res.cookie("token", token, {
        httpOnly: true, // Makes the cookie accessible only by the server
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });

     // Send response with user details and token
     return res.status(200).json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          fullName: user.fullname,
          username: user.username,
          email: user.email,
          bio: user.bio,
          image: user.image,
        },
        token: token, // Optionally send the token in the response body as well
      });

   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
   }

}

module.exports = LoginUser;