import Task from '../models/task.js';

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { 
      priority, 
      status, 
      dueDateCategory, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;

    const filter = {};
    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (dueDateCategory) filter.dueDateCategory = dueDateCategory;

    const tasks = await Task.find(filter)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: {
            priority: '$priority',
            status: '$status',
            dueDateCategory: '$dueDateCategory'
          },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};