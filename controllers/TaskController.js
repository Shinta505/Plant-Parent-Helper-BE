import Task from "../models/TaskModel.js";
import Plant from "../models/PlantModel.js";

// GET Semua Tugas
async function getTasks(req, res) {
    try {
        const response = await Task.findAll({
            include: [
                {
                    model: Plant,
                    // ✅ PERBAIKAN: Tambahkan "userId" di sini
                    attributes: ["id", "name", "location", "userId"],
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// GET Tugas by ID
async function getTaskById(req, res) {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id },
            include: [{ model: Plant, attributes: ["id", "name"] }],
        });

        if (!task) return res.status(404).json({ msg: "Tugas tidak ditemukan" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// CREATE Tugas
async function createTask(req, res) {
    try {
        const { type, schedule_time, note, status, plantId } = req.body;
        const newTask = await Task.create({ type, schedule_time, note, status, plantId });
        res.status(201).json({ msg: "Tugas berhasil ditambahkan", data: newTask });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// UPDATE Tugas
async function updateTask(req, res) {
    try {
        const { type, schedule_time, note, status } = req.body;
        const updated = await Task.update(
            { type, schedule_time, note, status },
            { where: { id: req.params.id } }
        );
        if (updated[0] === 0) {
            return res.status(400).json({ msg: "Tidak ada data yang diubah" });
        }
        res.status(200).json({ msg: "Tugas berhasil diperbarui" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// DELETE Tugas
async function deleteTask(req, res) {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res.status(400).json({ msg: "Tugas tidak ditemukan atau sudah dihapus" });
        }
        res.status(200).json({ msg: "Tugas berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export { getTasks, getTaskById, createTask, updateTask, deleteTask };