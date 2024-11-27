const User = require('../../Models/User.model');
const bcrypt = require('bcryptjs');

const resetPassword = async(req, res)=>{
     const {token} = req.params;
     const {newPassword} = req.body;

     try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry:{$gt: Date.now()},
         });
         if(!user){
            return res.status(400).send({ message: 'Invalid or expired token' });
         }
    
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(newPassword, salt);
         user.resetPasswordToken = undefined;
         user.resetPasswordExpiry = undefined;
    
         await user.save();
         res.status(200).send({ message: 'Password reset successfully' });
     } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
     }
}

module.exports = resetPassword;