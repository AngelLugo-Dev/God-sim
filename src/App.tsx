import { useEffect, useMemo, useRef, useState } from "react";

type Citizen = {
  id: number;
  nombre: string;
};

type ResourceState = {
  ajo: number;
  artefactos: number;
};

type GameState = {
  fe: number;
  poblacion: Citizen[];
  recursos: ResourceState;
  historial: string[];
};

type VillagerMotion = {
  id: number;
  x: number;
  y: number;
  delay: number;
};

const MAX_CIUDADANOS = 5;
const FE_POR_CIUDADANO = 1;
const TICKS_FE = 5000;
const LIGHTNING_DURATION = 420;
const ALTRAR_HEIGHT = 160;
const ALTRAR_WIDTH = 260;

const citizenPool = [
  "Aldo",
  "Belen",
  "Ciro",
  "Dara",
  "Elio",
  "Fara",
  "Galo",
  "Hera",
  "Ivo",
  "Luna",
  "Mara",
  "Nilo",
  "Ona",
  "Paz",
  "Runa",
  "Sami",
  "Taro",
  "Vale",
];

const initialState: GameState = {
  fe: 0,
  poblacion: [],
  recursos: {
    ajo: 0,
    artefactos: 0,
  },
  historial: [
    "El templo despierta en la llanura. La tierra espera una señal.",
    "La consola está lista. Escribe AYUDA para comenzar.",
  ],
};

function makeCitizenName(existingNames: string[]) {
  const available = citizenPool.filter((name) => !existingNames.includes(name));
  return available.length > 0
    ? available[0]
    : `Aldeano ${existingNames.length + 1}`;
}

function clampValue(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function App() {
  const [game, setGame] = useState<GameState>(initialState);
  const [command, setCommand] = useState("");
  const [flashLightning, setFlashLightning] = useState(false);
  const [altarItems, setAltarItems] = useState<number[]>([]);
  const [motionSeed, setMotionSeed] = useState<VillagerMotion[]>([]);
  const [lastAction, setLastAction] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setMotionSeed((current) => {
      const existing = new Map(current.map((item) => [item.id, item]));
      return game.poblacion.map((citizen, index) => {
        const previous = existing.get(citizen.id);
        return {
          id: citizen.id,
          x: previous?.x ?? 42 + index * 26,
          y: previous?.y ?? 52 + (index % 2) * 18,
          delay: previous?.delay ?? index * 0.15,
        };
      });
    });
  }, [game.poblacion]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setGame((current) => {
        if (current.poblacion.length === 0) {
          return current;
        }

        return {
          ...current,
          fe: current.fe + current.poblacion.length * FE_POR_CIUDADANO,
          historial: [
            `La fe crece en silencio. +${current.poblacion.length} fe por la devoción de los aldeanos.`,
            ...current.historial,
          ].slice(0, 40),
        };
      });
    }, TICKS_FE);

    timerRef.current = tick;
    return () => {
      window.clearInterval(tick);
      if (timerRef.current !== null) {
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMotionSeed((current) =>
        current.map((entry) => ({
          ...entry,
          x: clampValue(
            entry.x +
              (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * 24),
            10,
            230,
          ),
          y: clampValue(
            entry.y +
              (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * 20),
            24,
            150,
          ),
        })),
      );
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  const altarDecor = useMemo(
    () =>
      altarItems.map((id, index) => ({
        id,
        left: 48 + index * 28,
        bottom: 28 + (index % 2) * 10,
      })),
    [altarItems],
  );

  function pushLog(message: string) {
    setGame((current) => ({
      ...current,
      historial: [message, ...current.historial].slice(0, 40),
    }));
  }

  function notEnoughFe() {
    pushLog(
      "Los aldeanos están confundidos por tu silencio... murmuran sobre un sacrificio",
    );
  }

  function createCitizen() {
    setGame((current) => {
      if (current.poblacion.length >= MAX_CIUDADANOS) {
        return {
          ...current,
          historial: [
            "El templo ya no puede albergar más ciudadanos.",
            ...current.historial,
          ].slice(0, 40),
        };
      }

      const name = makeCitizenName(
        current.poblacion.map((citizen) => citizen.nombre),
      );
      const citizen: Citizen = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        nombre: name,
      };

      return {
        ...current,
        poblacion: [...current.poblacion, citizen],
        historial: [
          `Nace ${name} bajo la piedra del templo.`,
          ...current.historial,
        ].slice(0, 40),
      };
    });
  }

  function triggerLightning() {
    setGame((current) => {
      if (current.fe < 10) {
        notEnoughFe();
        return current;
      }

      return {
        ...current,
        fe: current.fe - 10,
        historial: [
          "Un rayo cae sobre la arena. El templo ruge con energía. -10 fe",
          ...current.historial,
        ].slice(0, 40),
      };
    });

    setFlashLightning(true);
    window.setTimeout(() => setFlashLightning(false), LIGHTNING_DURATION);
  }

  function dropGarlic() {
    setGame((current) => ({
      ...current,
      recursos: {
        ...current.recursos,
        ajo: current.recursos.ajo + 1,
      },
      historial: [
        "Aparece un ajo fresco sobre el altar. La ofrenda perfuma el aire.",
        ...current.historial,
      ].slice(0, 40),
    }));

    setAltarItems((current) => [...current, Date.now()]);
  }

  function handleHelp() {
    pushLog("Comandos: CREAR_CIUDADANO, RAYO, DAR_AJO, ESTADO, AYUDA");
  }

  function handleStatus() {
    pushLog(
      `Estado actual: fe=${game.fe}, poblacion=${game.poblacion.length}, ajo=${game.recursos.ajo}, artefactos=${game.recursos.artefactos}.`,
    );
  }

  function handleCommand(rawCommand: string) {
    const normalized = rawCommand.trim().toUpperCase();

    if (!normalized) {
      return;
    }

    setLastAction(normalized);

    if (normalized === "CREAR_CIUDADANO") {
      createCitizen();
      return;
    }

    if (normalized === "RAYO") {
      if (game.fe < 10) {
        notEnoughFe();
        return;
      }

      triggerLightning();
      return;
    }

    if (normalized === "DAR_AJO") {
      dropGarlic();
      return;
    }

    if (normalized === "AYUDA") {
      handleHelp();
      return;
    }

    if (normalized === "ESTADO") {
      handleStatus();
      return;
    }

    pushLog(`Comando desconocido: ${normalized}. Prueba AYUDA.`);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCommand(command);
    setCommand("");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,220,140,0.16),_transparent_28%),linear-gradient(180deg,_#111827_0%,_#0f172a_42%,_#05070d_100%)] text-amber-50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-pixel backdrop-blur-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-amber-200/70">
                God Sim pixel prototype
              </p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-amber-50 md:text-5xl">
                Templo de la Nada
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Un templo pequeño en medio del vacío. La única interfaz es una
                terminal: ordena, observa y deja que la fe haga el trabajo
                sucio.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 md:min-w-72">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                  Fe
                </div>
                <div className="mt-1 text-2xl font-black text-amber-100">
                  {game.fe}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[10px] uppercase tracking-[0.35em] text-emerald-200/70">
                  Población
                </div>
                <div className="mt-1 text-2xl font-black text-emerald-100">
                  {game.poblacion.length}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="flex min-h-0 flex-col gap-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/10 bg-[#1b2233] shadow-pixel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,214,133,0.22),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
              {flashLightning ? (
                <div className="pointer-events-none absolute inset-0 z-20 animate-flash bg-yellow-300/80 mix-blend-screen" />
              ) : null}

              <div className="relative grid min-h-[420px] grid-rows-[1fr_auto]">
                <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(180deg,#2b3350_0%,#1d2437_48%,#101624_100%)]">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-sky-300/10 to-transparent" />
                  <div className="absolute left-1/2 top-10 h-[250px] w-[220px] -translate-x-1/2">
                    <div className="absolute inset-x-0 bottom-0 mx-auto h-24 w-44 rounded-t-[1.25rem] border-4 border-[#d7b45d] bg-[#3a2a27] shadow-[0_0_0_6px_rgba(0,0,0,0.2)]" />
                    <div className="absolute left-1/2 top-2 h-28 w-20 -translate-x-1/2 rounded-t-[0.75rem] border-4 border-[#d7b45d] bg-[#5f4d40]" />
                    <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full border-4 border-[#d7b45d] bg-[#e8c66d]" />
                    <div className="absolute left-1/2 top-12 h-8 w-28 -translate-x-1/2 rounded-full bg-[#f3d37d]/25 blur-sm" />
                    <div className="absolute left-1/2 top-[112px] h-24 w-52 -translate-x-1/2 rounded-t-[3rem] border-4 border-[#9d7d45] bg-[#2d241f]" />
                    <div className="absolute left-1/2 top-[138px] h-18 w-38 -translate-x-1/2 rounded-t-[2rem] border-4 border-[#d7b45d] bg-[#7d5b39]" />
                    <div className="absolute left-1/2 top-[160px] h-12 w-18 -translate-x-1/2 rounded-full bg-[#211710]" />
                  </div>

                  <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs uppercase tracking-[0.35em] text-amber-100/70">
                    Altar vivo
                  </div>
                  <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/70">
                    Última orden: {lastAction || "ninguna"}
                  </div>

                  {motionSeed.map((villager, index) => {
                    const citizen = game.poblacion[index];
                    const hue =
                      index % 2 === 0 ? "bg-emerald-300" : "bg-amber-200";
                    return (
                      <div
                        key={villager.id}
                        className={`absolute h-3.5 w-3.5 rounded-full border border-white/70 shadow-lg transition-all duration-[1800ms] ease-in-out ${hue} animate-bob`}
                        style={{
                          left: `${villager.x}%`,
                          top: `${villager.y}%`,
                          transform: "translate(-50%, -50%)",
                          animationDelay: `${villager.delay}s`,
                        }}
                        title={citizen?.nombre}
                      >
                        <span className="absolute -left-1 -top-1 h-1.5 w-1.5 rounded-full bg-white/80" />
                      </div>
                    );
                  })}

                  {!game.poblacion.length ? (
                    <div className="absolute inset-x-0 bottom-16 flex justify-center text-center text-sm text-slate-200/70">
                      No hay aldeanos todavía. El templo aguarda la primera
                      chispa.
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-3 bg-[#101624] px-4 py-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                      Recursos
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-slate-100">
                      <div className="flex items-center justify-between">
                        <span>Ajo</span>
                        <span className="font-bold text-amber-100">
                          {game.recursos.ajo}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Artefactos</span>
                        <span className="font-bold text-cyan-100">
                          {game.recursos.artefactos}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 md:col-span-2">
                    <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                      Altar
                    </div>
                    <div className="relative mt-3 h-[160px] overflow-hidden rounded-[1.5rem] border border-amber-100/10 bg-[linear-gradient(180deg,#201811_0%,#130e0a_100%)]">
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.35))]" />
                      <div className="absolute left-1/2 top-4 h-9 w-24 -translate-x-1/2 rounded-[1rem] border border-amber-200/40 bg-[#493321]" />
                      <div className="absolute left-1/2 top-12 h-20 w-44 -translate-x-1/2 rounded-t-[2rem] border border-amber-200/30 bg-[#35261c]" />
                      {altarDecor.map((item) => (
                        <div
                          key={item.id}
                          className="absolute rounded-md border border-amber-200/30 bg-amber-300/90 shadow-[0_0_12px_rgba(255,214,102,0.35)]"
                          style={{
                            left: item.left,
                            bottom: item.bottom,
                            width: 18,
                            height: 18,
                          }}
                        />
                      ))}
                      <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-amber-100/70">
                        {game.recursos.ajo} ofrendas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="flex min-h-0 flex-col gap-4">
            <section className="flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-pixel">
              <div className="border-b border-white/10 px-4 py-3">
                <div className="text-[10px] uppercase tracking-[0.35em] text-amber-200/60">
                  Historial del templo
                </div>
                <h2 className="mt-1 text-lg font-black text-amber-50">
                  Crónica sagrada
                </h2>
              </div>
              <div className="scrollbar-thin min-h-0 flex-1 space-y-2 overflow-auto px-4 py-4 text-sm leading-6 text-slate-200">
                {game.historial.map((entry, index) => (
                  <div
                    key={`${entry}-${index}`}
                    className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2"
                  >
                    {entry}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-pixel">
              <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/60">
                Población
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.poblacion.length ? (
                  game.poblacion.map((citizen) => (
                    <span
                      key={citizen.id}
                      className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-100"
                    >
                      {citizen.nombre}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">
                    Sin ciudadanos activos.
                  </span>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-amber-100/10 bg-[#05070d]/90 p-4 shadow-pixel">
              <div className="text-[10px] uppercase tracking-[0.35em] text-amber-200/60">
                Consola
              </div>
              <form onSubmit={onSubmit} className="mt-3 flex gap-2">
                <input
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-amber-50 outline-none transition focus:border-amber-300/40 focus:bg-white/8"
                  placeholder="Escribe un comando..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="rounded-2xl border border-amber-200/20 bg-amber-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200"
                >
                  Ejecutar
                </button>
              </form>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <div className="rounded-xl border border-white/8 bg-white/5 p-2">
                  CREAR_CIUDADANO
                </div>
                <div className="rounded-xl border border-white/8 bg-white/5 p-2">
                  RAYO
                </div>
                <div className="rounded-xl border border-white/8 bg-white/5 p-2">
                  DAR_AJO
                </div>
                <div className="rounded-xl border border-white/8 bg-white/5 p-2">
                  AYUDA / ESTADO
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;
