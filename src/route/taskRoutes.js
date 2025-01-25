import express from 'express';
import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskStats
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/stats', getTaskStats);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;