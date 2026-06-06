const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const newsRoutes = require('./src/routes/news.routes');
// 1. Import your preferences routes here
const preferenceRoutes = require('./src/routes/preferences.routes'); 

const app = express();
app.use(express.json());

// Initialize MongoDB database connection session
connectDB();

// Mount system routes under the /api path namespace
app.use('/api', authRoutes);

// 2. CRITICAL FIX: Mount the news routes so /api/news works!
app.use('/api', newsRoutes);

// 3. CRITICAL FIX: Mount the preferences routes so /api/preferences works!
app.use('/api', preferenceRoutes);

// Wildcard fallback for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: "Resource route not found." });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server executing successfully on port ${PORT}`);
    });
}

// Critical for Airtribe validation test suites to run
module.exports = app;