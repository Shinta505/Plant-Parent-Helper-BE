import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const PlantCost = db.define("plant_cost", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default PlantCost;