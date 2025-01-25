import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  dueDateCategory: {
    type: String,
    enum: ['today', 'this-week', 'overdue'],
    default: 'today'
  }
}, { 
  timestamps: true 
});

// Pre-save middleware to categorize due date
TaskSchema.pre('save', function(next) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  if (this.dueDate < today) {
    this.dueDateCategory = 'overdue';
  } else if (this.dueDate <= weekEnd) {
    this.dueDateCategory = 'this-week';
  } else {
    this.dueDateCategory = 'today';
  }

  next();
});

export default mongoose.model('Task', TaskSchema);