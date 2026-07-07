const express = require('express');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static Files (View layer) ---
app.use(express.static(path.join(__dirname, 'views')));

// --- API Routes ---
app.use('/api/tasks', taskRoutes);

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// --- Fallback: serve index.html for SPA ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// --- Start Server ---
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 TODO List server running at http://localhost:${PORT}`);
  });
}

// Export for testing
module.exports = app;
