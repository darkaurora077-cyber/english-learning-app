import React from 'react';
import { CheckCircle, Circle, Clock, Zap, ArrowRight, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { dailyPlans, lessons, vocabBank } from '../data/lessonData';

interface Props { onNavigate: (page: string, params?: any) => void; }

export function DailyPlanPage({ onNavigate }: Props) {
  const { progress, getDueVocab } = useStore();
  const today = dailyPlans[progress.currentDay - 1];
  const todayLessons = lessons.filter(l => today.lessonIds.includes(l.id));
  const dueVocab = getDueVocab();

  const tasks = [
    ...todayLessons.map(lesson => ({
      id: lesson.id,
      type: 'lesson' as const,
      emoji: lesson.emoji,
      title: lesson.title,
      desc: lesson.description,
      xp: lesson.xp,
      minutes: lesson.estimatedMinutes,
      done: progress.completedLessons.includes(lesson.id),
      page: 'lessons',
    })),
    {
      id: 'vocab',
      type: 'vocab' as const,
      emoji: '🃏',
      title: `Vocabulary Review (${Math.min(dueVocab.length + 3, 10)} cards)`,
      desc: 'Spaced repetition — see only the cards that need your attention!',
      xp: 30,
      minutes: 8,
      done: false,
      page: 'vocab',
    },
    {
      id: 'speaking',
      type: 'speaking' as const,
      emoji: '🎤',
      title: `Speaking: ${today.theme}`,
      desc: 'Practice speaking out loud — this is crucial for fluency!',
      xp: 40,
      minutes: 10,
      done: false,
      page: 'speaking',
    },
  ];

  const completedCount = tasks.filter(t => t.done || t.type !== 'lesson').length;
  const totalXP = tasks.reduce((s, t) => s + t.xp, 0);

  // Week overview
  const weekStart = Math.max(1, Math.floor((progress.currentDay - 1) / 7) * 7 + 1);
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i).filter(d => d <= 30);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)',
        borderRadius: 20,
        padding: '24px 28px',
        marginBottom: 24,
        border: '1px solid var(--pink-200)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fce7f3', color: '#be185d', borderRadius: 99, padding: '4px 12px', fontWeight: 700, fontSize: 12, marginBottom: 8 }}>
              📅 Day {progress.currentDay} of 30
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#3b1f4e', margin: '0 0 6px' }}>
              {today.emoji} {today.theme}
            </h1>
            <p style={{ color: '#7c4f9e', fontSize: 14, fontWeight: 600, margin: 0 }}>
              Focus: <strong>{today.focusTense.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</strong>
            </p>
          </div>
          <div style={{ textAlign: 'center', background: 'white', borderRadius: 16, padding: '14px 20px', border: '1px solid var(--purple-200)' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#7e22ce' }}>{totalXP}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>XP available</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 700 }}>Today's completion</span>
            <span style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 700 }}>{tasks.filter(t => t.done).length}/{tasks.length}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(tasks.filter(t => t.done).length / tasks.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ADHD Box */}
      <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 14, padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 24 }}>💡</span>
        <div>
          <div style={{ fontWeight: 800, color: '#92400e', fontSize: 14, marginBottom: 2 }}>ADHD Focus Strategy</div>
          <div style={{ color: '#78350f', fontSize: 13 }}>Do tasks in order. Complete one, then take a 5-min break before the next. Each task is short — you can do this! 🌟</div>
        </div>
      </div>

      {/* Task list */}
      <h2 style={{ fontWeight: 900, fontSize: 18, color: '#3b1f4e', marginBottom: 16 }}>Your Tasks for Today</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {tasks.map((task, i) => (
          <div
            key={task.id}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '18px 20px',
              opacity: task.done ? 0.7 : 1,
              background: task.done ? '#f9fafb' : 'white',
              cursor: 'pointer',
            }}
            onClick={() => onNavigate(task.page)}
          >
            <div style={{ fontSize: 14, fontWeight: 900, color: '#d1d5db', width: 24, textAlign: 'center' }}>
              {task.done ? (
                <CheckCircle size={28} color="#22c55e" fill="#dcfce7" />
              ) : (
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f472b6, #c084fc)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: 13,
                }}>{i + 1}</div>
              )}
            </div>
            <div style={{ fontSize: 28 }}>{task.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: task.done ? '#9ca3af' : '#3b1f4e', textDecoration: task.done ? 'line-through' : 'none' }}>
                {task.title}
              </div>
              <div style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 600, marginTop: 2 }}>{task.desc}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Zap size={11} /> +{task.xp} XP
                </span>
                <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: 99, padding: '2px 10px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Clock size={11} /> ~{task.minutes}min
                </span>
              </div>
            </div>
            <ArrowRight size={18} color="#d1d5db" />
          </div>
        ))}
      </div>

      {/* 30-Day calendar overview */}
      <div className="card">
        <h3 style={{ fontWeight: 900, fontSize: 16, color: '#3b1f4e', marginBottom: 16 }}>30-Day Journey 🗓️</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
          {dailyPlans.map(plan => {
            const isPast = plan.day < progress.currentDay;
            const isToday = plan.day === progress.currentDay;
            const isFuture = plan.day > progress.currentDay;
            return (
              <div key={plan.day} style={{
                padding: '8px 4px',
                borderRadius: 10,
                textAlign: 'center',
                background: isToday ? 'linear-gradient(135deg, #f472b6, #c084fc)' : isPast ? '#f0fdf4' : '#f9fafb',
                border: isToday ? '2px solid #a855f7' : isPast ? '2px solid #86efac' : '2px solid #e5e7eb',
                cursor: isFuture ? 'default' : 'pointer',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: isToday ? 'white' : isPast ? '#16a34a' : '#9ca3af' }}>
                  {plan.day}
                </div>
                <div style={{ fontSize: 14 }}>{isPast ? '✅' : isToday ? '⭐' : isFuture && plan.day <= progress.currentDay + 3 ? plan.emoji : '🔒'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
