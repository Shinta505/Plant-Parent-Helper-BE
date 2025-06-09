// Tambahan ke TaskModel.js untuk dukung tugas berulang
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
    type: DataTypes.ENUM("watering", "fertilizing", "other"),
    allowNull: false,
  },
  schedule_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "done"),
    defaultValue: "pending",
  },
  repeatInterval: {
    type: DataTypes.ENUM("none", "daily", "weekly", "monthly"),
    defaultValue: "none",
  },
});

Plant.hasMany(Task, { foreignKey: "plantId" });
Task.belongsTo(Plant, { foreignKey: "plantId" });

export default Task;