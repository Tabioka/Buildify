// index.js - Main entry point for your app
import express from 'express';
import authRoutes from './auth.js';
import collaborationRoutes from './collaboration.js';
import analyticsRoutes from './analytics.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set up routes
app.use('/auth', authRoutes);
app.use('/collaboration', collaborationRoutes);
app.use('/analytics', analyticsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the No-Code/Low-Code Platform!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
