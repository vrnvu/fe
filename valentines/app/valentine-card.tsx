"use client";

import { useCallback, useEffect, useState } from "react";

type Phase = "question" | "celebration" | "envelope" | "letter";

const NO_TEXTS = [
  "No",
  "¿Estás segura?",
  "¿En serio?",
  "¡Piénsalo otra vez!",
  "¡Última oportunidad!",
  "¡No me hagas esto!",
  "¿Porfi?",
];

function getRandomPosition() {
  const padding = 80;
  const x = padding + Math.random() * (window.innerWidth - padding * 2);
  const y = padding + Math.random() * (window.innerHeight - padding * 2);
  return { x, y };
}

function Hearts() {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 16 + Math.random() * 24,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-[float-up_var(--dur)_ease-in_var(--delay)_forwards] text-red-400 opacity-0"
          style={{
            left: `${h.left}%`,
            bottom: "-40px",
            fontSize: `${h.size}px`,
            "--delay": `${h.delay}s`,
            "--dur": `${h.duration}s`,
          } as React.CSSProperties}
        >
          &#10084;
        </span>
      ))}
    </div>
  );
}

function Envelope({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={opened ? undefined : onOpen}
      aria-label="Abre la carta de amor"
      className="relative cursor-pointer border-none bg-transparent"
      style={{ perspective: "800px" }}
    >
      {/* Envelope body */}
      <div className="relative h-44 w-64 overflow-hidden rounded-lg bg-amber-100 shadow-xl md:h-56 md:w-80">
        {/* Heart seal */}
        {!opened && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="text-3xl text-red-400">&#10084;</span>
          </div>
        )}

        {/* Letter peeking out */}
        <div
          className={`absolute inset-x-3 top-0 rounded bg-white shadow-md ${
            opened ? "animate-letter-slide" : "opacity-0"
          }`}
          style={{ height: "85%" }}
        />
      </div>

      {/* Envelope flap */}
      <div
        className={`absolute top-0 left-0 h-22 w-64 bg-amber-200 md:h-28 md:w-80 ${
          opened ? "animate-flap-open" : ""
        }`}
        style={{
          clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          transformOrigin: "top center",
          backfaceVisibility: "hidden",
          zIndex: opened ? 0 : 20,
        }}
      />
    </button>
  );
}

function Letter() {
  return (
    <article
      className="animate-fade-in mx-4 max-w-md rounded-lg bg-white p-8 shadow-2xl md:p-12"
      style={{ transform: "rotate(-1deg)" }}
    >
      <div className="font-serif text-gray-800">
        <p className="mb-4 text-lg italic text-pink-600">Querida mía,</p>
        <p className="mb-4 leading-relaxed">
          Cada día contigo es un regalo que no quiero dejar de abrir. Haces que
          lo ordinario sea extraordinario y lo mundano, mágico.
        </p>
        <p className="mt-6 text-right italic text-pink-600">
          Con todo mi amor,
          <br />
          Tuyo por siempre
        </p>
      </div>
    </article>
  );
}

export function ValentineCard() {
  const [phase, setPhase] = useState<Phase>("question");
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const dodgeNo = useCallback(() => {
    setNoPosition(getRandomPosition());
    setDodgeCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (phase !== "celebration") return;
    const timer = setTimeout(() => setPhase("envelope"), 4000);
    return () => clearTimeout(timer);
  }, [phase]);

  const yesScale = Math.min(1 + dodgeCount * 0.1, 2);
  const noText = NO_TEXTS[Math.min(dodgeCount, NO_TEXTS.length - 1)];

  if (phase === "celebration") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-4">
        <Hearts />
        <div className="animate-pulse-soft text-center">
          <h1 className="text-5xl font-bold text-pink-600 md:text-7xl">
            ¡Bien!
          </h1>
          <p className="mt-4 text-2xl text-pink-500 md:text-3xl">
            ¡Sabía que dirías que sí!
          </p>
        </div>
      </main>
    );
  }

  if (phase === "envelope") {
    return (
      <main className="flex min-h-dvh animate-envelope-appear flex-col items-center justify-center gap-8 px-4">
        <p className="animate-fade-in text-2xl font-semibold text-pink-600 md:text-3xl">
          Tienes una carta...
        </p>
        <Envelope opened={false} onOpen={() => setPhase("letter")} />
      </main>
    );
  }

  if (phase === "letter") {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4">
        <p className="text-2xl font-semibold text-pink-600 md:text-3xl">
          Una carta para ti
        </p>
        <Letter />
        <Envelope opened onOpen={() => {}} />
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 md:text-6xl">
          ¿Quieres ser mi San Valentín?
        </h1>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setPhase("celebration")}
            className="cursor-pointer rounded-full bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:bg-pink-600"
            style={{ transform: `scale(${yesScale})` }}
          >
            Sí
          </button>

          {noPosition === null ? (
            <button
              type="button"
              onMouseEnter={dodgeNo}
              onTouchStart={dodgeNo}
              className="cursor-pointer rounded-full bg-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 shadow-lg transition-colors hover:bg-gray-400"
            >
              No
            </button>
          ) : null}
        </div>
      </div>

      {noPosition !== null ? (
        <button
          type="button"
          onMouseEnter={dodgeNo}
          onTouchStart={dodgeNo}
          className="fixed cursor-pointer rounded-full bg-gray-300 px-8 py-3 text-lg font-semibold text-gray-700 shadow-lg transition-colors hover:bg-gray-400"
          style={{
            left: `${noPosition.x}px`,
            top: `${noPosition.y}px`,
          }}
        >
          {noText}
        </button>
      ) : null}
    </main>
  );
}
