import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import taskRoutes from './route/taskRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Todo App Server Started Successfully',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message
  });
});

export default app;