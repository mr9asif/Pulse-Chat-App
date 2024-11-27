 const User = require('../../Models/User.model')
const getResetPasswordPage = async (req, res) => {
    const { resetToken } = req.params;
  
    try {
      // Find user by the reset token and check if it has expired
      const user = await User.findOne({
        resetPasswordToken: resetToken,
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      console.log('Token Expiry:', user.resetPasswordExpiry);
      console.log('Current Time:', Date.now());
  
      // Ensure token is not expired
      if (user.resetPasswordExpiry < Date.now()) {
        return res.status(400).json({ message: 'Expired token' });
      }
  
      // If token is valid, return a success response
      res.status(200).json({ message: 'Token is valid, you can reset your password' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  module.exports = getResetPasswordPage;
  