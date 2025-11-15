import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import db from "./src/database/db/db.js";
import usersRoute from "./src/routes/usersRoute.js";
import messagesRoute from "./src/routes/messagesRoute.js";
import { fileURLToPath } from "url";

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

// Database connection (using DATABASE_URL from .env)
db.connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

// Register API routes
app.use("/api/users", usersRoute);
app.use("/api/messages", messagesRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Users API available at /api/users`);
});
