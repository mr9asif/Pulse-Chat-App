const crypto = require('crypto');
const User = require('../../Models/User.model');
const nodemailer = require('nodemailer');

const forgetPassword = async(req, res)=>{
      try {
        const {email} = req.body;

      const user = await User.findOne({email});
      if(!user){
        res.status(401).send({message:"user not found!"})
      }
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetTokenExp = Date.now() + 3600000;

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = resetTokenExp;

      await user.save();

      const resetURL = `http://localhost:4000/reset-password/${resetToken}`;

    //  congigure nodemailer
     const transfer = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"asifalibd002@gmail.com",
            pass:"bruw yyja ttxp ebcs"
        }
     })

     const mailOptions = {
        from: "asifalibd002@gmail.com",
        to: user.email,
        subject: 'Password Reset Request',
        html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="http://localhost:4000/api/user/reset-password/${resetToken}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `, // Use HTML here to make the link clickable
    }
    
    await transfer.sendMail(mailOptions);
    res.status(200).send({ message: 'Reset password email sent' });
      } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
        console.log(error)
      }

}

module.exports = forgetPassword;