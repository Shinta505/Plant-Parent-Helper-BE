import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Import Routes
import UserRoute from "./routes/UserRoute.js";
import PlantRoute from "./routes/PlantRoute.js";
import TaskRoute from "./routes/TaskRoute.js";

// Import Database untuk sync (optional)
import db from "./config/Database.js";
import "./models/UserModel.js";
import "./models/PlantModel.js";
import "./models/TaskModel.js";

// Load .env config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// View Engine (optional, hanya jika pakai EJS)
app.set("view engine", "ejs");

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:57371", // <- Ganti sesuai alamat frontend
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(PlantRoute);
app.use(TaskRoute);

// Sync Database (opsional: bisa dihapus di production)
db.sync().then(() => {
  console.log("Database synced");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
