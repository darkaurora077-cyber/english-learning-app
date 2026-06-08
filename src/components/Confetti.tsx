import { useEffect, useState } from 'react';

const COLORS = ['#f472b6', '#c084fc', '#fb923c', '#facc15', '#34d399', '#60a5fa'];

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (!active) return;
    const newPieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.8,
      size: Math.random() * 8 + 6,
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}vw`,
            top: '-20px',
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
