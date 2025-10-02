import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.use("/community", userRoutes);


app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "document-api", time: new Date().toISOString() });
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));



