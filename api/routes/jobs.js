import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addJob, editJob, getJobs, getJobById } from "../controllers/jobController.js";

const router = express.Router();

// Public routes → anyone can see jobs
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected routes → only logged-in users can add/edit
router.post("/", authMiddleware, addJob);
router.put("/:id", authMiddleware, editJob);

export default router;
