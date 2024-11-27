
const express = require("express");
const RegisterUser = require("../Controllers/UserController/Register");
const LoginUser = require("../Controllers/UserController/LoginUser");
const authenticateToken = require("../Middleware/authenticateToken");
const getUserProfile = require('../Controllers/UserController/getUserProfile')
const updateUserProfile = require('../Controllers/UserController/updateProfile')

const router = express.Router();

// user register
router.post('/register', RegisterUser);

// user login
router.post("/login", LoginUser);



// Get user profile (protected route)
// router.get('/:id', authenticateToken, getUserProfile);

// // Update user profile (protected route)
router.put('/:id', authenticateToken, updateUserProfile);
// router.get('/:id',authenticateToken,  updateUserProfile)

// // Change password (protected route)
// router.put('/:id/change-password', authenticateToken, changePassword);

// // Delete user account (protected route)
// router.delete('/:id', authenticateToken, deleteUser);

module.exports=router;