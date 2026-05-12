/**
 * Servidor backend para Templo God Sim
 * Node.js + Express
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GameEngine } from "./models/GameEngine.js";
import { createGameRoutes } from "./api/gameRoutes.js";
import { GAME_RULES } from "./models/GameState.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const engine = new GameEngine();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/game", createGameRoutes(engine));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  },
);

// Ticks de simulación
setInterval(() => {
  engine.processFeTick();
}, GAME_RULES.FE_PER_TICK_MS);

setInterval(() => {
  engine.processBarbarianWave();
  engine.processBarbarianAttacks();
}, GAME_RULES.BARBARIAN_SPAWN_EVERY_MS);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🏛️ Templo God Sim backend escuchando en puerto ${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV || "development"}`);
  console.log(`🎮 API disponible en http://localhost:${PORT}/api/game`);
});
