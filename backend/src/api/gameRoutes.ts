/**
 * Rutas de API para el juego
 */

import { Router, Request, Response } from "express";
import { GameEngine } from "../models/GameEngine.js";

export function createGameRoutes(engine: GameEngine): Router {
  const router = Router();

  // Obtener el estado actual del juego
  router.get("/state", (req: Request, res: Response) => {
    res.json(engine.getState());
  });

  // Crear un ciudadano
  router.post("/citizen/create", (req: Request, res: Response) => {
    const { nombre } = req.body;
    if (!nombre || typeof nombre !== "string") {
      res.status(400).json({ error: "Campo 'nombre' requerido (string)." });
      return;
    }

    const result = engine.createCitizen(nombre);
    res.json({
      success: result.success,
      message: result.message,
      state: engine.getState(),
    });
  });

  // Convertir ciudadano a creyente
  router.post("/citizen/convert", (req: Request, res: Response) => {
    const { citizenId } = req.body;
    if (!citizenId) {
      res.status(400).json({ error: "Campo 'citizenId' requerido." });
      return;
    }

    const success = engine.convertToBeliever(citizenId);
    res.json({
      success,
      message: success
        ? "Ciudadano convertido a creyente."
        : "No se pudo convertir.",
      state: engine.getState(),
    });
  });

  // Lanzar rayo
  router.post("/spell/lightning", (req: Request, res: Response) => {
    const result = engine.castLightning();
    res.json({
      success: result.success,
      message: result.message,
      barbarosKilled: result.barbarosKilled,
      state: engine.getState(),
    });
  });

  // Dar ajo
  router.post("/offering/garlic", (req: Request, res: Response) => {
    const message = engine.giveGarlic();
    res.json({
      success: true,
      message,
      state: engine.getState(),
    });
  });

  // Procesar tick de fe
  router.post("/tick/faith", (req: Request, res: Response) => {
    engine.processFeTick();
    res.json({
      success: true,
      message: "Tick de fe procesado.",
      state: engine.getState(),
    });
  });

  // Procesar oleada de bárbaros
  router.post("/tick/barbarians", (req: Request, res: Response) => {
    engine.processBarbarianWave();
    engine.processBarbarianAttacks();
    res.json({
      success: true,
      message: "Tick de bárbaros procesado.",
      state: engine.getState(),
    });
  });

  // Información de debug
  router.get("/debug", (req: Request, res: Response) => {
    res.json(engine.getDebugInfo());
  });

  return router;
}
