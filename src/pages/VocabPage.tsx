import React, { useState, useMemo } from 'react';
import { RotateCcw, Check, X, Volume2, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';
import { vocabBank, VocabWord } from '../data/lessonData';
import { Confetti } from '../components/Confetti';

type ViewMode = 'browse' | 'review' | 'done';

function FlashCard({ word, onRate }: { word: VocabWord; onRate: (q: 0|1|2|3|4|5) => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          background: flipped ? 'linear-gradient(135deg, #f3e8ff, #fce7f3)' : 'linear-gradient(135deg, #fce7f3, #fdf4ff)',
          border: '2px solid var(--pink-200)',
          borderRadius: 24,
          padding: '40px 32px',
          minHeight: 260,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          textAlign: 'center',
          marginBottom: 20,
          transition: 'all 0.3s',
          boxShadow: '0 8px 32px rgba(168,85,247,0.12)',
        }}
      >
        {!flipped ? (
          <>
            <div style={{ fontSize: 13, color: '#be185d', fontWeight: 700, marginBottom: 16, background: '#fce7f3', padding: '4px 12px', borderRadius: 99 }}>
              {word.partOfSpeech} · {word.category}
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#3b1f4e', marginBottom: 12 }}>{word.word}</div>
            <div style={{ fontSize: 16, color: '#9ca3af', fontWeight: 600, marginBottom: 16 }}>{word.phonetic}</div>
            <div style={{ fontSize: 13, color: '#a855f7', fontWeight: 600 }}>👆 Tap to reveal</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#7e22ce', marginBottom: 12 }}>{word.translation}</div>
            <div style={{ fontSize: 15, color: '#3b1f4e', fontWeight: 600, fontStyle: 'italic', marginBottom: 8, maxWidth: 400 }}>
              "{word.example}"
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#a855f7', marginTop: 8 }}>How well did you know this?</div>
          </>
        )}
      </div>

      {flipped && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} className="animate-slide-up">
          <button
            onClick={() => onRate(0)}
            style={{ flex: 1, minWidth: 100, padding: '14px', borderRadius: 12, border: '2px solid #fda4af', background: '#fff1f2', fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, cursor: 'pointer', color: '#be123c' }}
          >
            😵 No idea
          </button>
          <button
            onClick={() => onRate(2)}
            style={{ flex: 1, minWidth: 100, padding: '14px', borderRadius: 12, border: '2px solid #fde68a', background: '#fffbeb', fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, cursor: 'pointer', color: '#92400e' }}
          >
            🤔 Sort of
          </button>
          <button
            onClick={() => onRate(4)}
            style={{ flex: 1, minWidth: 100, padding: '14px', borderRadius: 12, border: '2px solid #86efac', background: '#f0fdf4', fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, cursor: 'pointer', color: '#15803d' }}
          >
            ✅ I know it!
          </button>
          <button
            onClick={() => onRate(5)}
            style={{ flex: 1, minWidth: 100, padding: '14px', borderRadius: 12, border: '2px solid #c084fc', background: '#f3e8ff', fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, cursor: 'pointer', color: '#7e22ce' }}
          >
            ⭐ Perfect!
          </button>
        </div>
      )}
    </div>
  );
}

export function VocabPage() {
  const { progress, reviewVocab, getDueVocab, addXP } = useStore();
  const [mode, setMode] = useState<ViewMode>('browse');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const dueVocab = getDueVocab();
  const categories = ['all', ...Array.from(new Set(progress.vocab.map(w => w.category)))];

  const filteredVocab = useMemo(() =>
    categoryFilter === 'all' ? progress.vocab : progress.vocab.filter(w => w.category === categoryFilter),
    [progress.vocab, categoryFilter]
  );

  const handleRate = (word: VocabWord, q: 0|1|2|3|4|5) => {
    reviewVocab(word.id, q);
    addXP(q >= 3 ? 8 : 3);
    if (currentIdx + 1 >= dueVocab.length) {
      setShowConfetti(true);
      setMode('done');
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  if (mode === 'review' && dueVocab.length > 0) {
    const word = dueVocab[currentIdx];
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button className="btn-ghost" onClick={() => { setMode('browse'); setCurrentIdx(0); }}>← Back</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#3b1f4e' }}>Review Session</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{currentIdx + 1} / {dueVocab.length} cards</div>
          </div>
          <div />
        </div>
        <div className="progress-bar" style={{ marginBottom: 24 }}>
          <div className="progress-fill" style={{ width: `${(currentIdx / dueVocab.length) * 100}%` }} />
        </div>
        <FlashCard word={word} onRate={q => handleRate(word, q)} />
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>
          💡 Tap the card to flip it
        </div>
      </div>
    );
  }

  if (mode === 'done') {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '28px 20px', textAlign: 'center' }}>
        <Confetti active={showConfetti} />
        <div style={{ fontSize: 80, marginBottom: 16 }}>🌟</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e', marginBottom: 8 }}>Review Complete!</h2>
        <p style={{ fontSize: 16, color: '#7c4f9e', fontWeight: 600, marginBottom: 24 }}>
          You reviewed all due cards. Come back tomorrow for more! 🌸
        </p>
        <button className="btn-primary" onClick={() => { setMode('browse'); setCurrentIdx(0); }}>
          Browse All Words 📚
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#3b1f4e', marginBottom: 4 }}>🃏 Vocabulary</h1>
          <p style={{ color: '#7c4f9e', fontWeight: 600 }}>Spaced repetition — smarter learning!</p>
        </div>
        {dueVocab.length > 0 && (
          <button className="btn-primary" onClick={() => { setMode('review'); setCurrentIdx(0); }}>
            Review {dueVocab.length} Cards <RotateCcw size={16} />
          </button>
        )}
      </div>

      {/* Due cards banner */}
      {dueVocab.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)', border: '2px solid var(--pink-200)', borderRadius: 16, padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>⏰</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: '#3b1f4e', fontSize: 15 }}>{dueVocab.length} cards ready for review!</div>
            <div style={{ color: '#7c4f9e', fontSize: 13, fontWeight: 600 }}>Spaced repetition: review now to lock these words in your memory 🧠</div>
          </div>
          <button className="btn-primary" onClick={() => { setMode('review'); setCurrentIdx(0); }}>
            Start Review
          </button>
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: 99,
              border: `2px solid ${categoryFilter === cat ? '#a855f7' : '#e5e7eb'}`,
              background: categoryFilter === cat ? '#f3e8ff' : 'white',
              fontFamily: 'Nunito',
              fontWeight: 700,
              fontSize: 13,
              color: categoryFilter === cat ? '#7e22ce' : '#6b7280',
              cursor: 'pointer',
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Word grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filteredVocab.map(word => {
          const isDue = word.nextReview <= Date.now();
          const learned = word.repetitions > 0;
          return (
            <div
              key={word.id}
              className="card"
              style={{
                background: learned ? 'linear-gradient(135deg, #f0fdf4, #f3e8ff)' : 'white',
                border: isDue ? '2px solid #f9a8d4' : learned ? '2px solid #86efac' : '1px solid var(--border)',
                position: 'relative',
              }}
            >
              {isDue && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: '#fce7f3', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700, color: '#be185d' }}>
                  📋 Review
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{word.partOfSpeech}</span>
                <span style={{ background: '#fce7f3', color: '#be185d', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{word.category}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#3b1f4e', marginBottom: 4 }}>{word.word}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600, marginBottom: 6 }}>{word.phonetic}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#7e22ce', marginBottom: 8 }}>{word.translation}</div>
              <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', lineHeight: 1.5 }}>"{word.example}"</div>
              {learned && (
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ flex: 1, height: 5, background: '#f3f4f6', borderRadius: 99 }}>
                    <div style={{ width: `${Math.min((word.repetitions / 5) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #f472b6, #c084fc)', borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 700 }}>lvl {word.repetitions}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
