const express = require('express');
require('dotenv').config();

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const newsRoutes = require('./src/routes/news.routes');

const app = express();
app.use(express.json());

// Initialize MongoDB database connection session
connectDB();

// Mount system routes under the /api path namespace
app.use('/api', authRoutes);
app.use('/api', newsRoutes);

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