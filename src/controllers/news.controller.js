const axios = require('axios');
const User = require('../models/user.model');

exports.getNews = async (req, res) => {
    try {
        // 1. Look up the user using the email from your decoded JWT payload
        const user = await User.findOne({ email: req.user.email });
        
        // 2. CRITICAL FIX: Gracefully handle if user is null or preferences don't exist yet
        const prefs = user?.preferences || {};

        // 3. SECURE FALLBACKS: Use optional chaining to prevent reading '.length' of undefined
        const category = (prefs.categories && prefs.categories.length > 0) ? prefs.categories[0] : 'general';
        const language = (prefs.languages && prefs.languages.length > 0) ? prefs.languages[0] : 'en';

        // 4. Construct the external query string
        const newsApiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&language=${language}&apiKey=${process.env.NEWS_API_KEY}`;
        
        // 5. Query the third-party platform
        const response = await axios.get(newsApiUrl);
        
        // 6. Return standard format payload back to the automated test spec runner
        return res.status(200).json({ articles: response.data.articles || [] });
        
    } catch (error) {
        // Keeps errors completely transparent to your prompt log console terminal
        console.error("NEWS CONTROLLER EXCEPTION:", error.message);
        
        return res.status(500).json({ 
            message: "Error fetching news from external API provider.",
            error: error.response ? error.response.data.message : error.message 
        });
    }
};