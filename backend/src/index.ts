import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "UP",
    service: "Work Sweet API",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
  console.log(`📊 [database]: Connected to PostgreSQL`);
  console.log(`🚀 [health]: http://localhost:${port}/api/health`);
});

export default app;
