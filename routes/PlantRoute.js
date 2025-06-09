import express from "express";
import {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
    addPlantCost,
    getPlantCosts,
    updatePlantCost,
} from "../controllers/PlantController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// Semua rute tanaman dengan proteksi token
router.get("/plants", verifyToken, getPlants);
router.get("/plants/:id", verifyToken, getPlantById);
router.post("/plants", verifyToken, createPlant);
router.put("/plants/:id", verifyToken, updatePlant);
router.delete("/plants/:id", verifyToken, deletePlant);
router.post("/plants/:id/costs", verifyToken, addPlantCost);
router.get("/plants/:id/costs", verifyToken, getPlantCosts);
router.put("/plants/:id/costs/:costId", verifyToken, updatePlantCost);

export default router;