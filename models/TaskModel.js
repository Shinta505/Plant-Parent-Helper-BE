import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Plant from "./PlantModel.js";

const Task = db.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("watering", "fertilizing", "other"), // Jenis tugas
    allowNull: false,
  },
  schedule_time: {
    type: DataTypes.DATE, // Jadwal tugas, misalnya 2025-06-07 08:00:00
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT, // Catatan tugas, contoh: "Gunakan pupuk organik"
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "done"), // Status tugas
    defaultValue: "pending",
  },
});

// Relasi: Satu tanaman bisa punya banyak task
Plant.hasMany(Task, { foreignKey: "plantId" });
Task.belongsTo(Plant, { foreignKey: "plantId" });

export default Task;