import express from "express";
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/TaskController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Semua rute tugas
router.get("/tasks", verifyToken, getTasks);
router.get("/tasks/:id", verifyToken, getTaskById);
router.post("/tasks", verifyToken, createTask);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, deleteTask);

export default router;