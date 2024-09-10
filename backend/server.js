// server.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const spotifyRoutes = require('./routes/spotifyRoutes');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.OPENAI_API_KEY;
console.log(apiKey);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI, // Your frontend origin
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies and credentials
  }),
);
app.use(cookieParser());
app.use('/api', spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
