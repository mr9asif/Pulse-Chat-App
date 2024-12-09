
const express = require("express");
const RegisterUser = require("../Controllers/UserController/Register");
const LoginUser = require("../Controllers/UserController/LoginUser");
const authenticateToken = require("../Middleware/authenticateToken");

const updateUserProfile = require('../Controllers/UserController/updateProfile');
const forgetPassword = require("../Controllers/UserController/forgetPassword");
const resetPassword = require("../Controllers/UserController/resetPassword");
const getResetPasswordPage = require("../Controllers/UserController/getResetPasswordPage");
const logout = require("../Controllers/UserController/logout");

const router = express.Router();

// user register
router.post('/register', RegisterUser);

// user login
router.post("/login", LoginUser);



// Get user profile (protected route)
// router.get('/:id', authenticateToken, getUserProfile);

// // Update user profile (protected route)
router.put('/:id', authenticateToken, updateUserProfile);


// // Change password (protected route)
router.post('/forgetPass', forgetPassword)

// get resetpassword page
router.get('/reset-password/:token', getResetPasswordPage)

router.put('/reset-password/:token', resetPassword)
// router.put('/:id/change-password', authenticateToken, changePassword);

// logout
router.post('/logout', logout);


// // Delete user account (protected route)
// router.delete('/:id', authenticateToken, deleteUser);

module.exports=router;