import React, { useState } from 'react';
import { CheckCircle, Clock, Zap, ChevronLeft, ChevronRight, X, Check, Lightbulb } from 'lucide-react';
import { useStore } from '../store/useStore';
import { lessons, allExercises, Exercise } from '../data/lessonData';
import { Confetti } from '../components/Confetti';

interface Props { onNavigate: (page: string) => void; }

function ExerciseCard({ exercise, onAnswer, onNext }: {
  exercise: Exercise;
  onAnswer: (correct: boolean, xp: number) => void;
  onNext: () => void;
}) {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCheck = () => {
    if (result) return;
    const userAnswer = (exercise.type === 'multiple-choice' ? selected : input).trim().toLowerCase();
    const correctAnswer = exercise.answer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer || correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer);
    setResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setShowExplanation(false);
    else setShowExplanation(true);
    onAnswer(isCorrect, isCorrect ? exercise.xp : Math.floor(exercise.xp * 0.3));
  };

  const bgColor = result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fff1f2' : 'white';
  const borderColor = result === 'correct' ? '#86efac' : result === 'wrong' ? '#fda4af' : 'var(--border)';

  return (
    <div style={{ background: bgColor, border: `2px solid ${borderColor}`, borderRadius: 20, padding: '28px', transition: 'all 0.3s' }} className={result ? 'animate-slide-up' : ''}>
      {/* Type badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ background: 'var(--pink-100)', color: '#be185d', borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
          {exercise.type === 'fill-blank' && '✏️ Fill in the Blank'}
          {exercise.type === 'translate' && '🌐 Translate'}
          {exercise.type === 'multiple-choice' && '☑️ Multiple Choice'}
          {exercise.type === 'speaking' && '🎤 Speaking'}
          {exercise.type === 'reorder' && '🔀 Reorder'}
          {exercise.type === 'error-correction' && '🛠️ Fix the Error'}
        </span>
        <span style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
          <Zap size={11} style={{ display: 'inline', marginRight: 3 }} />+{exercise.xp} XP
        </span>
      </div>

      {/* Prompt */}
      <p style={{ fontSize: 18, fontWeight: 800, color: '#3b1f4e', marginBottom: 20, lineHeight: 1.5 }}>
        {exercise.prompt}
      </p>

      {/* Input area */}
      {exercise.type === 'multiple-choice' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {exercise.options?.map(opt => (
            <button
              key={opt}
              disabled={!!result}
              onClick={() => !result && setSelected(opt)}
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                border: `2px solid ${selected === opt ? '#a855f7' : '#e5e7eb'}`,
                background: selected === opt
                  ? result === 'correct' ? '#dcfce7' : result === 'wrong' ? '#fff1f2' : '#f3e8ff'
                  : result && opt === exercise.answer ? '#dcfce7' : 'white',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: 15,
                cursor: result ? 'default' : 'pointer',
                textAlign: 'left',
                color: '#3b1f4e',
                transition: 'all 0.2s',
              }}
            >
              {opt}
              {result && opt === exercise.answer && <Check size={16} style={{ float: 'right', color: '#16a34a' }} />}
            </button>
          ))}
        </div>
      ) : exercise.type === 'speaking' ? (
        <div style={{ background: '#f3e8ff', borderRadius: 14, padding: '16px', marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: '#7e22ce', fontWeight: 700, marginBottom: 8 }}>🎤 Say it out loud, then type what you said:</p>
          <textarea
            value={input}
            onChange={e => !result && setInput(e.target.value)}
            disabled={!!result}
            placeholder="Type your spoken response here..."
            rows={3}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: 12,
              border: '2px solid var(--purple-200)', fontFamily: 'Nunito, sans-serif',
              fontSize: 15, resize: 'vertical', background: result ? '#f9fafb' : 'white',
              color: '#3b1f4e', outline: 'none',
            }}
          />
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={input}
            onChange={e => !result && setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !result && input && handleCheck()}
            disabled={!!result}
            placeholder="Type your answer..."
            style={{
              width: '100%', padding: '14px 18px', borderRadius: 12,
              border: `2px solid ${result === 'correct' ? '#86efac' : result === 'wrong' ? '#fda4af' : '#e5e7eb'}`,
              fontFamily: 'Nunito, sans-serif', fontSize: 16, fontWeight: 600,
              background: result ? '#f9fafb' : 'white', color: '#3b1f4e', outline: 'none',
            }}
          />
        </div>
      )}

      {/* Hint */}
      {exercise.hint && !result && (
        <button className="btn-ghost" onClick={() => setShowHint(!showHint)} style={{ marginBottom: 12 }}>
          <Lightbulb size={15} /> {showHint ? 'Hide hint' : 'Show hint'}
        </button>
      )}
      {showHint && exercise.hint && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 14, color: '#92400e', fontWeight: 600 }}>
          💡 {exercise.hint}
        </div>
      )}

      {/* Feedback */}
      {result && (
        <div style={{ marginBottom: 16 }} className="animate-bounce-in">
          {result === 'correct' ? (
            <div style={{ background: '#dcfce7', border: '2px solid #86efac', borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontWeight: 900, fontSize: 16, color: '#15803d', marginBottom: 4 }}>
                🎉 {['Perfect!', 'Amazing!', 'Brilliant!', 'Excellent!', 'You got it!'][Math.floor(Math.random() * 5)]}
              </div>
              {exercise.explanation && <div style={{ fontSize: 14, color: '#166534' }}>{exercise.explanation}</div>}
            </div>
          ) : (
            <div style={{ background: '#fff1f2', border: '2px solid #fda4af', borderRadius: 14, padding: '14px 18px' }}>
              <div style={{ fontWeight: 900, fontSize: 15, color: '#be123c', marginBottom: 4 }}>
                💪 Almost! The correct answer is:
              </div>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#3b1f4e', marginBottom: 6 }}>"{exercise.answer}"</div>
              {exercise.explanation && <div style={{ fontSize: 14, color: '#9f1239' }}>{exercise.explanation}</div>}
            </div>
          )}
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>
        {!result ? (
          <button
            className="btn-primary"
            onClick={handleCheck}
            disabled={exercise.type === 'multiple-choice' ? !selected : !input}
            style={{ flex: 1 }}
          >
            Check Answer ✨
          </button>
        ) : (
          <button className="btn-primary" onClick={onNext} style={{ flex: 1 }}>
            Continue <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function LessonRunner({ lessonId, onClose }: { lessonId: string; onClose: () => void }) {
  const lesson = lessons.find(l => l.id === lessonId)!;
  const { completeLesson, addXP } = useStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (correct: boolean, xp: number) => {
    setEarned(e => e + xp);
    addXP(xp);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= lesson.exercises.length) {
      setDone(true);
      setShowConfetti(true);
      completeLesson(lessonId, 0);
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  if (done) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }} className="animate-bounce-in">
      <Confetti active={showConfetti} />
      <div style={{ fontSize: 80, marginBottom: 16 }}>🎊</div>
      <h2 style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e', marginBottom: 8 }}>Lesson Complete!</h2>
      <p style={{ fontSize: 18, color: '#7c4f9e', fontWeight: 600, marginBottom: 24 }}>
        You earned <strong style={{ color: '#a855f7' }}>+{earned} XP</strong> 🌟
      </p>
      <div style={{ background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)', borderRadius: 20, padding: '24px', marginBottom: 24, display: 'inline-block' }}>
        <div style={{ fontSize: 14, color: '#7c4f9e', fontWeight: 700 }}>Exercises completed</div>
        <div style={{ fontSize: 40, fontWeight: 900, color: '#3b1f4e' }}>{lesson.exercises.length}</div>
      </div>
      <br />
      <button className="btn-primary" onClick={onClose}>
        Back to Lessons 🌸
      </button>
    </div>
  );

  const ex = lesson.exercises[currentIdx];
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button className="btn-ghost" onClick={onClose}><ChevronLeft size={16} /> Back</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#3b1f4e' }}>{lesson.emoji} {lesson.title}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{currentIdx + 1} / {lesson.exercises.length}</div>
        </div>
        <button className="btn-ghost" onClick={onClose}><X size={16} /></button>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ marginBottom: 24 }}>
        <div className="progress-fill" style={{ width: `${((currentIdx) / lesson.exercises.length) * 100}%` }} />
      </div>

      <ExerciseCard exercise={ex} onAnswer={handleAnswer} onNext={handleNext} />
    </div>
  );
}

export function LessonsPage({ onNavigate }: Props) {
  const { progress } = useStore();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  if (activeLesson) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px 20px' }}>
        <LessonRunner lessonId={activeLesson} onClose={() => setActiveLesson(null)} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#3b1f4e', marginBottom: 8 }}>📖 Lessons</h1>
      <p style={{ color: '#7c4f9e', fontWeight: 600, marginBottom: 24 }}>Master each verb tense step by step!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {lessons.map((lesson, i) => {
          const done = progress.completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className="card"
              onClick={() => setActiveLesson(lesson.id)}
              style={{
                cursor: 'pointer',
                background: done ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : 'white',
                border: done ? '2px solid #86efac' : '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {done && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <CheckCircle size={22} color="#16a34a" fill="#dcfce7" />
                </div>
              )}
              <div style={{ fontSize: 40, marginBottom: 12 }}>{lesson.emoji}</div>
              <h3 style={{ fontWeight: 900, fontSize: 17, color: '#3b1f4e', marginBottom: 6 }}>{lesson.title}</h3>
              <p style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 600, marginBottom: 14 }}>{lesson.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                  <Zap size={10} style={{ display: 'inline', marginRight: 3 }} />+{lesson.xp} XP
                </span>
                <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                  <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />~{lesson.estimatedMinutes}min
                </span>
                <span style={{ background: '#fce7f3', color: '#be185d', borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                  {lesson.exercises.length} exercises
                </span>
              </div>
              {done && (
                <div style={{ marginTop: 12, background: '#dcfce7', borderRadius: 10, padding: '8px 12px', fontSize: 13, fontWeight: 700, color: '#15803d' }}>
                  ✅ Completed! Tap to review
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
