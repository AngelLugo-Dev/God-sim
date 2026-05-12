/**
 * Motor del juego: contiene la lógica central
 */

import {
  GameState,
  Citizen,
  CitizenType,
  Barbarian,
  GAME_RULES,
  initialGameState,
} from "./GameState.js";

export class GameEngine {
  private state: GameState;
  private feTick: NodeJS.Timeout | null = null;
  private barbarianTick: NodeJS.Timeout | null = null;

  constructor() {
    this.state = initialGameState();
  }

  getState(): GameState {
    return { ...this.state };
  }

  setState(newState: GameState): void {
    this.state = newState;
  }

  /**
   * Crea un ciudadano nuevo
   */
  createCitizen(nombre: string): { success: boolean; message: string } {
    if (this.state.poblacion.length >= GAME_RULES.MAX_CIUDADANOS) {
      return {
        success: false,
        message: `El templo ya no puede albergar más ciudadanos. Máximo: ${GAME_RULES.MAX_CIUDADANOS}`,
      };
    }

    const isBeliever =
      this.state.poblacion.length < GAME_RULES.BELIEVERS_SPAWN_DEFAULT;

    const citizen: Citizen = {
      id: `citizen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nombre,
      type: isBeliever ? CitizenType.BELIEVER : CitizenType.UNBELIEVER,
      createdAt: Date.now(),
      position: {
        x: 50 + Math.random() * 50,
        y: 50 + Math.random() * 50,
      },
    };

    this.state.poblacion.push(citizen);

    const typeMsg = isBeliever ? "creyente" : "incrédulo";
    this.addLog(`Nace ${nombre} bajo la piedra del templo. Es ${typeMsg}.`);

    return { success: true, message: `${nombre} ha sido creado.` };
  }

  /**
   * Convierte un ciudadano a creyente
   */
  convertToBeliever(citizenId: string): boolean {
    const citizen = this.state.poblacion.find((c) => c.id === citizenId);
    if (citizen && citizen.type === CitizenType.UNBELIEVER) {
      citizen.type = CitizenType.BELIEVER;
      this.addLog(`${citizen.nombre} ahora cree en el templo.`);
      return true;
    }
    return false;
  }

  /**
   * Ejecuta un rayo que mata bárbaros y consume fe
   */
  castLightning(): {
    success: boolean;
    message: string;
    barbarosKilled: number;
  } {
    if (this.state.fe < 10) {
      this.addLog(
        "Los aldeanos están confundidos por tu silencio... murmuran sobre un sacrificio",
      );
      return {
        success: false,
        message: "No hay suficiente fe.",
        barbarosKilled: 0,
      };
    }

    this.state.fe -= 10;

    // Mata el primer bárbaro (simplificado)
    let killed = 0;
    if (this.state.barbaros.length > 0) {
      this.state.barbaros.shift();
      killed = 1;
    }

    this.addLog(
      `Un rayo cae sobre la arena. -10 fe. ${killed} bárbaro(s) destruido(s).`,
    );
    return { success: true, message: "Rayo lanzado.", barbarosKilled: killed };
  }

  /**
   * Da ajo como ofrenda
   */
  giveGarlic(): string {
    this.state.recursos.ajo += 1;
    this.addLog(
      "Aparece un ajo fresco sobre el altar. La ofrenda perfuma el aire.",
    );
    return "Ajo ofrendado.";
  }

  /**
   * Procesa el tick pasivo de fe
   */
  processFeTick(): void {
    const believers = this.state.poblacion.filter(
      (c) => c.type === CitizenType.BELIEVER,
    );
    const feGained = believers.length * GAME_RULES.FE_PER_BELIEVER_PER_TICK;

    if (feGained > 0) {
      this.state.fe += feGained;
      this.addLog(
        `La fe crece en silencio. +${feGained} fe por la devoción de ${believers.length} creyente(s).`,
      );
    }
  }

  /**
   * Procesa la oleada de bárbaros
   */
  processBarbarianWave(): void {
    // Solo genera bárbaros si hay suficientes ciudadanos
    if (this.state.poblacion.length < GAME_RULES.BARBARIAN_SPAWN_THRESHOLD) {
      return;
    }

    // Spawnea nuevos bárbaros
    const barbariansToSpawn = GAME_RULES.BARBARIANS_PER_WAVE;
    for (let i = 0; i < barbariansToSpawn; i++) {
      const barbarian: Barbarian = {
        id: `barbarian-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`,
        position: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        health: GAME_RULES.BARBARIAN_HEALTH,
        damage: GAME_RULES.BARBARIAN_DAMAGE,
        createdAt: Date.now(),
        targetId: null,
      };

      this.state.barbaros.push(barbarian);
    }

    this.state.wave += 1;
    this.addLog(
      `⚔️ Oleada ${this.state.wave} de bárbaros aparece en el horizonte. ${this.state.barbaros.length} enemigo(s) en total.`,
    );
  }

  /**
   * Simula ataque de bárbaros a ciudadanos
   */
  processBarbarianAttacks(): void {
    if (this.state.barbaros.length === 0 || this.state.poblacion.length === 0) {
      return;
    }

    for (const barbarian of this.state.barbaros) {
      // Si no tiene objetivo o el objetivo está muerto, elige uno nuevo
      if (
        !barbarian.targetId ||
        !this.state.poblacion.find((c) => c.id === barbarian.targetId)
      ) {
        const randomCitizen =
          this.state.poblacion[
            Math.floor(Math.random() * this.state.poblacion.length)
          ];
        barbarian.targetId = randomCitizen.id;
      }

      // Ataca al objetivo
      const target = this.state.poblacion.find(
        (c) => c.id === barbarian.targetId,
      );
      if (target) {
        // Simplificado: mata al ciudadano directamente
        const index = this.state.poblacion.indexOf(target);
        if (index > -1) {
          this.state.poblacion.splice(index, 1);
          this.addLog(`💀 ${target.nombre} fue asesinado por un bárbaro.`);
        }
      }
    }
  }

  /**
   * Añade un mensaje al historial
   */
  addLog(message: string): void {
    this.state.historial = [message, ...this.state.historial].slice(0, 50);
  }

  /**
   * Obtiene el estado completo de debug
   */
  getDebugInfo(): object {
    return {
      believers: this.state.poblacion.filter(
        (c) => c.type === CitizenType.BELIEVER,
      ).length,
      unbelievers: this.state.poblacion.filter(
        (c) => c.type === CitizenType.UNBELIEVER,
      ).length,
      totalCitizens: this.state.poblacion.length,
      barbaros: this.state.barbaros.length,
      fe: this.state.fe,
      wave: this.state.wave,
    };
  }
}
