import type { CardData } from "./types";

type CardProps = {
  card: CardData;
  disabled: boolean;
  onFlip: (id: number) => void;
};

export function Card({ card, disabled, onFlip }: CardProps) {
  const isRevealed = card.isFlipped || card.isMatched;

  function handleClick() {
    if (disabled || isRevealed) return;
    onFlip(card.id);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isRevealed ? card.symbol : "Hidden card"}
      className="h-24 w-20 cursor-pointer [perspective:800px] md:h-28 md:w-24"
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${isRevealed ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* Back face (visible when not flipped) */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-pink-500 text-3xl text-white shadow-md [backface-visibility:hidden]">
          ♥
        </div>
        {/* Front face (visible when flipped) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-xl bg-white text-3xl shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.isMatched ? "animate-pulse-soft" : ""}`}
        >
          {card.symbol}
        </div>
      </div>
    </button>
  );
}
