const logout = async (req, res) => {
    try {
        // Clear the cookie named "token"
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        return res.status(200).send("Logout successfully!");
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send("An error occurred during logout");
    }
};

module.exports = logout;
