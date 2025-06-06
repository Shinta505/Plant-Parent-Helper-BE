import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const Plant = db.define("plant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // Nama tanaman, contoh: "Monstera"
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING, // Lokasi tanaman, contoh: "Ruang tamu"
    allowNull: true,
  },
  note: {
    type: DataTypes.TEXT, // Catatan perkembangan, misalnya "Sudah tumbuh daun baru"
    allowNull: true,
  },
});

// Relasi: Satu user bisa punya banyak tanaman
User.hasMany(Plant, { foreignKey: "userId" });
Plant.belongsTo(User, { foreignKey: "userId" });

export default Plant;