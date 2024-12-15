const User = require('../../Models/User.model');

const getSearchUsers = async (req, res) => {
    const { search } = req.query; // Extract `search` from query parameters

    // Check if search parameter exists
    if (!search || search.trim() === "") {
        return res.status(400).json({ message: "Please provide a search value" });
    }

    try {
        // Perform search using regex for fullName, username, and email
        const users = await User.find({
            $or: [
                { fullName: { $regex: search, $options: "i" } }, // Case-insensitive search
                { username: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        });

        // Return users if found
        return res.status(200).json({ users });
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = getSearchUsers;
