
const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferences.controller');
const authenticateToken = require('../middleware/auth.middleware');


router.get('/preferences', authenticateToken, preferencesController.getPreferences);
router.put('/preferences', authenticateToken, preferencesController.updatePreferences);


module.exports = router;