import User from "./UserModel.js";
import Plant from "./PlantModel.js";
import PlantCost from "./PlantCostModel.js";
import Task from "./TaskModel.js";

// User - Plant
User.hasMany(Plant, { foreignKey: "userId" });
Plant.belongsTo(User, { foreignKey: "userId" });

// Plant - PlantCost
Plant.hasMany(PlantCost, { foreignKey: "plantId" });
PlantCost.belongsTo(Plant, { foreignKey: "plantId" });

// Plant - Task
Plant.hasMany(Task, { foreignKey: "plantId" });
Task.belongsTo(Plant, { foreignKey: "plantId" });

export { User, Plant, PlantCost, Task };