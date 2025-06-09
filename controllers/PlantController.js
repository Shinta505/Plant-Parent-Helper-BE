import { Op } from "sequelize";
import Plant from "../models/PlantModel.js";
import User from "../models/UserModel.js";
import PlantCost from "../models/PlantCostModel.js";

// GET Semua Tanaman
async function getPlants(req, res) {
    try {
        const { keyword } = req.query;
        let where = {};
        if (keyword) {
            where = {
                name: {
                    [Op.like]: `%${keyword}%`,
                },
            };
        }
        const response = await Plant.findAll({
            where,
            include: [{ model: User, attributes: ["id", "name", "email"] }],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// GET Tanaman by ID
async function getPlantById(req, res) {
    try {
        const plant = await Plant.findOne({
            where: { id: req.params.id },
            include: [{ model: User, attributes: ["id", "name", "email"] }],
        });
        if (!plant)
            return res.status(404).json({ msg: "Tanaman tidak ditemukan" });
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// CREATE Tanaman
async function createPlant(req, res) {
    try {
        const { name, location, note, imageUrl, userId } = req.body;
        const newPlant = await Plant.create({
            name,
            location,
            note,
            imageUrl,
            userId,
        });
        res
            .status(201)
            .json({ msg: "Tanaman berhasil ditambahkan", data: newPlant });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// UPDATE Tanaman
async function updatePlant(req, res) {
    try {
        const { name, location, note, imageUrl } = req.body;
        const updated = await Plant.update(
            { name, location, note, imageUrl },
            { where: { id: req.params.id } }
        );
        if (updated[0] === 0) {
            return res.status(400).json({ msg: "Tidak ada data yang diubah" });
        }
        res.status(200).json({ msg: "Tanaman berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// UPDATE Biaya Perawatan
async function updatePlantCost(req, res) {
    try {
        const { amount } = req.body;
        const { id, costId } = req.params;

        const cost = await PlantCost.findOne({
            where: { id: costId, plantId: id },
        });
        if (!cost) {
            return res.status(404).json({ msg: "Biaya tidak ditemukan" });
        }

        await cost.update({ amount });
        res.status(200).json({ msg: "Biaya berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// DELETE Tanaman
async function deletePlant(req, res) {
    try {
        const deleted = await Plant.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res
                .status(400)
                .json({ msg: "Tanaman tidak ditemukan atau sudah dihapus" });
        }
        res.status(200).json({ msg: "Tanaman berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// POST Biaya Perawatan
async function addPlantCost(req, res) {
    try {
        const { amount } = req.body;
        const plantId = req.params.id;

        const plant = await Plant.findByPk(plantId);
        if (!plant) {
            return res.status(404).json({ msg: "Tanaman tidak ditemukan" });
        }

        const newCost = await PlantCost.create({ plantId, amount });
        res
            .status(201)
            .json({ msg: "Biaya perawatan ditambahkan", data: newCost });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// GET Semua Biaya per Tanaman
async function getPlantCosts(req, res) {
    try {
        const costs = await PlantCost.findAll({
            where: { plantId: req.params.id },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(costs);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
    addPlantCost,
    getPlantCosts,
    updatePlantCost,
};