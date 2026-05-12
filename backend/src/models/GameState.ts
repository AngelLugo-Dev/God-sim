/**
 * Modelos de datos para el God Sim
 */

export enum CitizenType {
  BELIEVER = "believer", // Creyente: genera fe
  UNBELIEVER = "unbeliever", // No creyente: solo ocupa vivienda
}

export enum EntityType {
  CITIZEN = "citizen",
  BARBARIAN = "barbarian",
}

export interface Citizen {
  id: string;
  nombre: string;
  type: CitizenType;
  createdAt: number;
  position: { x: number; y: number };
}

export interface Barbarian {
  id: string;
  position: { x: number; y: number };
  health: number;
  damage: number;
  createdAt: number;
  targetId: string | null; // ID del ciudadano objetivo
}

export interface GameState {
  fe: number;
  poblacion: Citizen[];
  barbaros: Barbarian[];
  recursos: {
    ajo: number;
    artefactos: number;
  };
  historial: string[];
  wave: number; // Oleada de bárbaros
  createdAt: number;
}

export const initialGameState = (): GameState => ({
  fe: 0,
  poblacion: [],
  barbaros: [],
  recursos: {
    ajo: 0,
    artefactos: 0,
  },
  historial: [
    "El templo despierta en la llanura. La tierra espera una señal.",
    "La consola está lista. Escribe AYUDA para comenzar.",
    "Nota: No todos los aldeanos creen en ti. Solo los primeros 5 son fieles por defecto.",
  ],
  wave: 0,
  createdAt: Date.now(),
});

export const GAME_RULES = {
  MAX_CIUDADANOS: 10,
  BELIEVERS_SPAWN_DEFAULT: 5, // Los primeros 5 son creyentes
  FE_PER_BELIEVER_PER_TICK: 1,
  FE_PER_TICK_MS: 5000,
  BARBARIAN_SPAWN_THRESHOLD: 5, // Se genera la primera oleada
  BARBARIAN_SPAWN_EVERY_MS: 8000,
  BARBARIANS_PER_WAVE: 2,
  BARBARIAN_HEALTH: 10,
  BARBARIAN_DAMAGE: 3,
};
