import "newrelic";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { errorHandler } from "./app/middlewares/errorHandler";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/user.route";
import { ApiLogMiddleware } from "./app/middlewares/ApiLogMiddleware";
import { initKeys } from "./libs/jwt";
import dailyWelcomeQuotesRoutes from "./routes/dailywelcomequotes.route";
import PayloadChecksumMiddleware from "./app/middlewares/PayloadChecksumMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize keys first
(async () => {
  await initKeys();
})();

// CORS should be one of the first middlewares
// Update CORS to allow your IP address
const corsOptions = {
  origin: [
    process.env.CLIENT_URL || "http://localhost:3000",
    "http://192.168.0.104:3000",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// Payload checksum middleware
// app.use(PayloadChecksumMiddleware);

// Security headers
app.use(helmet());
app.use(
  helmet.referrerPolicy({
    policy: "strict-origin-when-cross-origin",
  })
);

// Body parsing
app.use(bodyParser.json({ limit: "50mb" }));

// Your custom middleware
app.use(ApiLogMiddleware("auth-api"));

// Routes
app.use("/user", userRoutes);
app.use("/quotes", dailyWelcomeQuotesRoutes);

app.get("/health-check", (req, res) => {
  res.json({ 
    status: "health-check", 
    service: "auth-api", 
    time: new Date().toISOString() 
  });
});

// Error handler
app.use(errorHandler);

// Process handlers
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
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`CORS enabled for: ${process.env.CLIENT_URL || "http://localhost:3000"}`);
    });
  } catch (err: any) {
    console.error("DB connection failed:", err.message);
    setTimeout(startServer, 5000);
  }
}

// Export app for testing
export { app };

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}