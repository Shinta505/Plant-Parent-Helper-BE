import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Plant = db.define("plant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Plant;
