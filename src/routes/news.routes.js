const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/preferences', authenticateToken, newsController.getPreferences);
router.put('/preferences', authenticateToken, newsController.updatePreferences);
router.get('/news', authenticateToken, newsController.getNews);

module.exports = router;