const User = require('../models/user.model'); // Ensure this points to your exact User model file

/**
 * GET /preferences
 * Retrieves the logged-in user's categories and languages.
 */
exports.getPreferences = async (req, res) => {
    try {
        // req.user.id was attached by your authMiddleware
        const userId = req.user.id;

        // Fetch user from MongoDB
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return user's preferences, ensuring arrays exist even if empty
        return res.status(200).json({
            message: "Preferences retrieved successfully.",
            preferences: user.preferences || { categories: [], languages: [] }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving preferences.",
            error: error.message
        });
    }
};

/**
 * PUT /preferences
 * Updates the categories and languages array for the authenticated user.
 */
exports.updatePreferences = async (req, res) => {
    try {
        const userId = req.user.id;
        const { preferences } = req.body;

        // Validation: Ensure preference object exists
        if (!preferences) {
            return res.status(400).json({ 
                message: "Validation failed. 'preferences' object is required in the body." 
            });
        }

        // Validation: Verify structures are arrays if provided
        if (preferences.categories && !Array.isArray(preferences.categories)) {
            return res.status(400).json({ message: "Categories must be provided as an array." });
        }
        if (preferences.languages && !Array.isArray(preferences.languages)) {
            return res.status(400).json({ message: "Languages must be provided as an array." });
        }

        // Save preferences updates into the user record
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { preferences: preferences } },
            { new: true, runValidators: true } // Return the fresh updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({
            message: "Preferences updated successfully.",
            preferences: updatedUser.preferences
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating preferences.",
            error: error.message
        });
    }
};