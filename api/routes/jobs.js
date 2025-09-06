import express from 'express';
import {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob
} from '../controllers/jobsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes (anyone can fetch)
router.get('/', getJobs);
router.get('/:id', getJob);

// Protected routes (only logged-in users)
router.post('/', authMiddleware, addJob);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);

export default router;
