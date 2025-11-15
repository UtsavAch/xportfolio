import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import db from "./src/database/db/db.js";
import authRoute from "./src/auth/authRoute.js";

// Import all API routes
import profileRoute from "./src/routes/profileRoute.js";
import socialMediaRoute from "./src/routes/socialMediaRoute.js";
import educationRoute from "./src/routes/educationRoute.js";
import workExperienceRoute from "./src/routes/workExperienceRoute.js";
import projectRoute from "./src/routes/projectRoute.js";
import skillRoute from "./src/routes/skillRoute.js";
import courseRoute from "./src/routes/courseRoute.js";
import contactMessageRoute from "./src/routes/contactMessageRoute.js";

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

// Register authentication routes
app.use("/auth", authRoute);

// API routes
app.use("/api/profile", profileRoute);
app.use("/api/social-media", socialMediaRoute);
app.use("/api/education", educationRoute);
app.use("/api/work-experience", workExperienceRoute);
app.use("/api/projects", projectRoute);
app.use("/api/skills", skillRoute);
app.use("/api/courses", courseRoute);
app.use("/api/contact-messages", contactMessageRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Users API available at /api/users`);
});
