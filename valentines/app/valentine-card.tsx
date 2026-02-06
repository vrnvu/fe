"use client";

import { useCallback, useState } from "react";

const NO_TEXTS = [
  "No",
  "Are you sure?",
  "Really?",
  "Think again!",
  "Last chance!",
  "Don't do this!",
  "Pretty please?",
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

export function ValentineCard() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);

  const dodgeNo = useCallback(() => {
    setNoPosition(getRandomPosition());
    setDodgeCount((c) => c + 1);
  }, []);

  const yesScale = Math.min(1 + dodgeCount * 0.1, 2);
  const noText = NO_TEXTS[Math.min(dodgeCount, NO_TEXTS.length - 1)];

  if (accepted) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-4">
        <Hearts />
        <div className="animate-pulse-soft text-center">
          <h1 className="text-5xl font-bold text-pink-600 md:text-7xl">
            Yay!
          </h1>
          <p className="mt-4 text-2xl text-pink-500 md:text-3xl">
            I knew you&apos;d say yes!
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600 md:text-6xl">
          Will you be my Valentine?
        </h1>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setAccepted(true)}
            className="cursor-pointer rounded-full bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:bg-pink-600"
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes
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
