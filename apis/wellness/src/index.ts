import "newrelic";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorHandler } from "./app/middlewares/errorHandler";
import { AppDataSource } from "./config/database";
import wellnessRoutes from "./routes/wellness.route";
import { ApiLogMiddleware } from "./app/middlewares/ApiLogMiddleware";
// import { initKeys } from "./app/middlewares/PassportJweMiddleware";
import { initKeys } from "./libs/jwt";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

(async () => {
  await initKeys();
})();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(ApiLogMiddleware("wellness-api"));

app.use("/wellness", wellnessRoutes);



app.get("/health-check", (req, res) => {
  res.json({ status: "health-check", service: "wellness-api", time: new Date().toISOString() });
});

app.use(errorHandler);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

async function startServer() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err:any) {
    console.error("DB connection failed:", err.message);
    setTimeout(startServer, 5000);
  }
}
startServer();



