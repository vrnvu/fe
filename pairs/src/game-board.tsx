import { useCallback, useEffect, useState } from "react";
import { Card } from "./card";
import type { CardData } from "./types";

const SYMBOLS = ["💆", "🥩", "💐", "🍷", "🍫", "🎬", "✈️", "🛁"];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCards(): CardData[] {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  return shuffle(pairs).map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
}

export function GameBoard() {
  const [cards, setCards] = useState(createCards);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const allMatched = cards.every((c) => c.isMatched);

  const resetUnmatched = useCallback(() => {
    setCards((prev) =>
      prev.map((c) => (c.isMatched ? c : { ...c, isFlipped: false })),
    );
    setFlippedIds([]);
  }, []);

  useEffect(() => {
    if (flippedIds.length < 2) return;

    const [firstId, secondId] = flippedIds;
    const first = cards.find((c) => c.id === firstId)!;
    const second = cards.find((c) => c.id === secondId)!;

    if (first.symbol === second.symbol) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === firstId || c.id === secondId
            ? { ...c, isMatched: true }
            : c,
        ),
      );
      setScore((s) => s + 1);
      setFlippedIds([]);
    } else {
      const timer = setTimeout(resetUnmatched, 1000);
      return () => clearTimeout(timer);
    }
  }, [flippedIds, cards, resetUnmatched]);

  function handleFlip(id: number) {
    if (flippedIds.length >= 2) return;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)),
    );
    setFlippedIds((prev) => [...prev, id]);
  }

  function handleRestart() {
    setCards(createCards());
    setFlippedIds([]);
    setScore(0);
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4">
      <h1 className="animate-fade-in text-3xl font-bold text-rose-600 md:text-4xl">
        :D
      </h1>

      <p className="text-lg text-rose-500">
        Regalitos: <span className="font-bold">{score}</span> / {SYMBOLS.length}
      </p>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            disabled={flippedIds.length >= 2}
            onFlip={handleFlip}
          />
        ))}
      </div>

      {allMatched && (
        <div className="animate-fade-in flex flex-col items-center gap-3">
          <p className="text-xl font-bold text-rose-600">
            You found all pairs!
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full bg-pink-500 px-6 py-2 font-semibold text-white shadow-md transition-colors hover:bg-pink-600"
          >
            Play again
          </button>
        </div>
      )}
    </main>
  );
}
