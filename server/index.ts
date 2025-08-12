import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleExtractUrl } from "./routes/extract-url";
import { handleExtractPdf, uploadMiddleware } from "./routes/extract-pdf";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Content extraction routes
  app.post("/api/extract-url", handleExtractUrl);
  app.post("/api/extract-pdf", uploadMiddleware, handleExtractPdf);

  return app;
}
