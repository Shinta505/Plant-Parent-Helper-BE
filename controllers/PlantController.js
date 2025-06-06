import Plant from "../models/PlantModel.js";
import User from "../models/UserModel.js";

// GET Semua Tanaman
async function getPlants(req, res) {
    try {
        const response = await Plant.findAll({
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

        if (!plant) return res.status(404).json({ msg: "Tanaman tidak ditemukan" });
        res.status(200).json(plant);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// CREATE Tanaman
async function createPlant(req, res) {
    try {
        const { name, location, note, userId } = req.body;
        const newPlant = await Plant.create({ name, location, note, userId });
        res.status(201).json({ msg: "Tanaman berhasil ditambahkan", data: newPlant });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// UPDATE Tanaman
async function updatePlant(req, res) {
    try {
        const { name, location, note } = req.body;
        const updated = await Plant.update(
            { name, location, note },
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

// DELETE Tanaman
async function deletePlant(req, res) {
    try {
        const deleted = await Plant.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res.status(400).json({ msg: "Tanaman tidak ditemukan atau sudah dihapus" });
        }
        res.status(200).json({ msg: "Tanaman berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export { getPlants, getPlantById, createPlant, updatePlant, deletePlant };