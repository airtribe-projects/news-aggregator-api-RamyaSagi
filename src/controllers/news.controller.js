const axios = require('axios');
const User = require('../models/user.model');

exports.getPreferences = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ preferences: user.preferences });
    } catch (error) {
        res.status(500).json({ message: "Error fetching preferences." });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const { categories, languages } = req.body;
        if (!Array.isArray(categories) || !Array.isArray(languages)) {
            return res.status(400).json({ message: "Categories and languages must be arrays." });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            { preferences: { categories, languages } },
            { new: true }
        );

        res.status(200).json({ message: "Preferences updated successfully", preferences: updatedUser.preferences });
    } catch (error) {
        res.status(500).json({ message: "Error updating preferences." });
    }
};

exports.getNews = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const prefs = user.preferences;

        const category = prefs.categories.length > 0 ? prefs.categories[0] : 'general';
        const language = prefs.languages.length > 0 ? prefs.languages[0] : 'en';

        const newsApiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&language=${language}&apiKey=${process.env.NEWS_API_KEY}`;
        
        const response = await axios.get(newsApiUrl);
        res.status(200).json({ articles: response.data.articles });
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching news from external API provider.",
            error: error.response ? error.response.data.message : error.message 
        });
    }
};