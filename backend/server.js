require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get('/ping', (req, res) => {
  res.json({ ok: true, msg: 'Backend is running 🚀' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));