const User = require('../../Models/User.model');

const updateUserProfile = async (req, res) => {
    try {
        const { fullname, username, image } = req.body;

        // Collect fields to update
        const updates = {};
        if (fullname) updates.fullname = fullname;
        if (username) updates.username = username;
        if (image) updates.image = image;

        // Ensure there are fields to update
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        // Update user in the database
        const user = await User.findByIdAndUpdate(
            req.user.id, // Assuming user ID is available in `req.user` (e.g., from middleware)
            { $set: updates }, // Use `$set` to update only specified fields
            { new: true } // Return the updated user
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", data: user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = updateUserProfile;
