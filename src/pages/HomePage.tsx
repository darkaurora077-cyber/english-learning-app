import React from 'react';
import { ArrowRight, BookOpen, Mic, Brain, Star, Trophy, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { dailyPlans, lessons } from '../data/lessonData';

interface Props { onNavigate: (page: string) => void; }

export function HomePage({ onNavigate }: Props) {
  const { progress, level, xpInLevel, xpToNext, advanceDay, getDueVocab } = useStore();
  const today = dailyPlans[progress.currentDay - 1];
  const dueVocab = getDueVocab();

  const todayLessons = lessons.filter(l => today.lessonIds.includes(l.id));
  const completedToday = todayLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const totalToday = todayLessons.length;

  const motivationalMessages = [
    "You're doing amazing! Keep going! 💪",
    "Every mistake is a lesson! 🌱",
    "Fluency is closer than you think! ✨",
    "Your brain is getting stronger! 🧠",
    "Today's practice = tomorrow's fluency! 🚀",
  ];
  const message = motivationalMessages[progress.currentDay % motivationalMessages.length];

  const quickActions = [
    { icon: '📖', label: 'Today\'s Lesson', sub: `${totalToday - completedToday} remaining`, color: '#fce7f3', border: '#f9a8d4', page: 'lessons' },
    { icon: '🃏', label: 'Vocabulary Cards', sub: `${dueVocab.length} due for review`, color: '#f3e8ff', border: '#d8b4fe', page: 'vocab' },
    { icon: '🎤', label: 'Speaking Practice', sub: 'Build your confidence', color: '#ecfdf5', border: '#bbf7d0', page: 'speaking' },
    { icon: '📅', label: 'Daily Plan', sub: `Day ${progress.currentDay} of 30`, color: '#fffbeb', border: '#fde68a', page: 'daily' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #e0f2fe 100%)',
        borderRadius: 24,
        padding: '32px 36px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--pink-200)',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'rgba(244,114,182,0.15)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -20, left: 100, width: 80, height: 80, background: 'rgba(192,132,252,0.15)', borderRadius: '50%' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: '#be185d', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Day {progress.currentDay} of 30 ✨</p>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e', marginBottom: 8, lineHeight: 1.2 }}>
              {today.emoji} {today.theme}
            </h1>
            <p style={{ color: '#7c4f9e', fontWeight: 600, fontSize: 15, marginBottom: 20 }}>{message}</p>

            {/* Progress bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 700 }}>Today's Progress</span>
                <span style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 700 }}>{completedToday}/{totalToday} lessons</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: totalToday > 0 ? `${(completedToday / totalToday) * 100}%` : '0%' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => onNavigate('daily')}>
                Start Today <ArrowRight size={16} />
              </button>
              {completedToday === totalToday && totalToday > 0 && (
                <button className="btn-secondary" onClick={advanceDay}>
                  Next Day 🎉
                </button>
              )}
            </div>
          </div>

          {/* Level card */}
          <div style={{ background: 'white', borderRadius: 20, padding: '20px 24px', textAlign: 'center', boxShadow: '0 4px 24px rgba(168,85,247,0.12)', minWidth: 160, border: '1px solid var(--purple-200)' }}>
            <div style={{ fontSize: 40, marginBottom: 4 }}>⭐</div>
            <div style={{ fontFamily: 'Pacifico, cursive', fontSize: 18, color: '#7e22ce' }}>Level {level}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0' }}>
              {xpInLevel} / {xpToNext} XP
            </div>
            <div style={{ width: '100%', height: 8, background: '#f3e8ff', borderRadius: 99 }}>
              <div style={{ width: `${(xpInLevel / xpToNext) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f472b6, #c084fc)', borderRadius: 99, transition: 'width 0.6s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ADHD Focus Box */}
      <div style={{
        background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
        border: '2px solid #fde68a',
        borderRadius: 16,
        padding: '16px 20px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 28 }}>🧠</span>
        <div>
          <div style={{ fontWeight: 800, color: '#92400e', fontSize: 15 }}>ADHD Tip of the Day</div>
          <div style={{ color: '#78350f', fontSize: 14, fontWeight: 600 }}>
            Focus on ONE lesson at a time. Take a 5-minute break after each exercise. You've got this! 💛
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <h2 style={{ fontWeight: 900, fontSize: 20, color: '#3b1f4e', marginBottom: 16 }}>What would you like to do? 🌸</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {quickActions.map(action => (
          <button
            key={action.page}
            onClick={() => onNavigate(action.page)}
            style={{
              background: action.color,
              border: `2px solid ${action.border}`,
              borderRadius: 16,
              padding: '20px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              fontFamily: 'Nunito, sans-serif',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{action.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#3b1f4e', marginBottom: 4 }}>{action.label}</div>
            <div style={{ fontSize: 12, color: '#7c4f9e', fontWeight: 600 }}>{action.sub}</div>
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
        {[
          { icon: <Star size={20} color="#f59e0b" fill="#f59e0b" />, label: 'Total XP', value: progress.xp, color: '#fffbeb' },
          { icon: <BookOpen size={20} color="#a855f7" />, label: 'Lessons Done', value: progress.completedLessons.length, color: '#f3e8ff' },
          { icon: <Brain size={20} color="#ec4899" />, label: 'Words Learned', value: progress.vocab.filter(w => w.repetitions > 0).length, color: '#fce7f3' },
          { icon: <Trophy size={20} color="#f97316" />, label: 'Day Streak', value: progress.streak, color: '#fff7ed' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ background: stat.color, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e' }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
