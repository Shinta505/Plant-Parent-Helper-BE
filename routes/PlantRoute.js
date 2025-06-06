import express from "express";
import {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
} from "../controllers/PlantController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Semua rute tanaman
router.get("/plants", verifyToken, getPlants);
router.get("/plants/:id", verifyToken, getPlantById);
router.post("/plants", verifyToken, createPlant);
router.put("/plants/:id", verifyToken, updatePlant);
router.delete("/plants/:id", verifyToken, deletePlant);

export default router;