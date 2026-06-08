import React from 'react';
import { Trophy, Flame, Star, BookOpen, Mic, Brain, Target, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { lessons, dailyPlans } from '../data/lessonData';

export function ProgressPage() {
  const { progress, level, xpInLevel, xpToNext, resetProgress } = useStore();

  const totalLessons = lessons.length;
  const completedLessons = progress.completedLessons.length;
  const learnedWords = progress.vocab.filter(w => w.repetitions > 0).length;
  const totalWords = progress.vocab.length;
  const daysCompleted = progress.currentDay - 1;

  const tenseProgress = [
    { tense: 'Simple Present', lessons: ['l1'], icon: '📝' },
    { tense: 'Present Continuous', lessons: ['l2'], icon: '▶️' },
    { tense: 'Simple Past', lessons: ['l3'], icon: '⏮️' },
    { tense: 'Past Continuous', lessons: ['l4'], icon: '🔄' },
    { tense: 'Present Perfect', lessons: ['l5'], icon: '✅' },
    { tense: 'Future', lessons: ['l6'], icon: '🔮' },
    { tense: 'Error Correction', lessons: ['l7'], icon: '🛠️' },
  ].map(t => ({
    ...t,
    completed: t.lessons.every(id => progress.completedLessons.includes(id)),
  }));

  const badges = [
    { id: 'first_lesson', emoji: '🌱', label: 'First Lesson', desc: 'Complete your first lesson', earned: completedLessons >= 1 },
    { id: 'streak3', emoji: '🔥', label: '3-Day Streak', desc: 'Study 3 days in a row', earned: progress.streak >= 3 },
    { id: 'streak7', emoji: '🏆', label: 'Week Warrior', desc: 'Study 7 days in a row', earned: progress.streak >= 7 },
    { id: 'vocab10', emoji: '📚', label: 'Word Collector', desc: 'Learn 10 vocabulary words', earned: learnedWords >= 10 },
    { id: 'xp500', emoji: '⭐', label: 'XP Hunter', desc: 'Earn 500 XP', earned: progress.xp >= 500 },
    { id: 'all_lessons', emoji: '👑', label: 'Lesson Master', desc: 'Complete all lessons', earned: completedLessons >= totalLessons },
    { id: 'day15', emoji: '💪', label: 'Halfway There', desc: 'Reach day 15', earned: daysCompleted >= 15 },
    { id: 'day30', emoji: '🦋', label: 'Fluency Goal', desc: 'Complete the 30-day plan!', earned: daysCompleted >= 30 },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      <h1 style={{ fontSize: 26, fontWeight: 900, color: '#3b1f4e', marginBottom: 4 }}>📊 Your Progress</h1>
      <p style={{ color: '#7c4f9e', fontWeight: 600, marginBottom: 28 }}>Look how far you've come! 🌸</p>

      {/* Level card */}
      <div style={{
        background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)',
        borderRadius: 24,
        padding: '28px',
        marginBottom: 24,
        border: '2px solid var(--pink-200)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ background: 'linear-gradient(135deg, #ec4899, #a855f7)', borderRadius: '50%', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            ⭐
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Pacifico, cursive', fontSize: 22, color: '#7e22ce', marginBottom: 4 }}>Level {level}</div>
            <div style={{ fontSize: 14, color: '#7c4f9e', fontWeight: 600, marginBottom: 8 }}>
              {xpInLevel} / {xpToNext} XP to next level
            </div>
            <div style={{ maxWidth: 300 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(xpInLevel / xpToNext) * 100}%` }} />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: '#3b1f4e' }}>{progress.xp}</div>
            <div style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 600 }}>Total XP</div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: <Flame size={22} color="#f97316" fill="#f97316" />, value: progress.streak, label: 'Day Streak', bg: '#fff7ed', border: '#fed7aa' },
          { icon: <BookOpen size={22} color="#a855f7" />, value: `${completedLessons}/${totalLessons}`, label: 'Lessons Done', bg: '#f3e8ff', border: '#d8b4fe' },
          { icon: <Brain size={22} color="#ec4899" />, value: `${learnedWords}/${totalWords}`, label: 'Words Learned', bg: '#fce7f3', border: '#f9a8d4' },
          { icon: <Target size={22} color="#16a34a" />, value: `${daysCompleted}/30`, label: 'Days Completed', bg: '#f0fdf4', border: '#86efac' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ background: stat.bg, border: `2px solid ${stat.border}`, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e' }}>{stat.value}</div>
            <div style={{ fontSize: 13, color: '#7c4f9e', fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tense mastery */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 900, fontSize: 17, color: '#3b1f4e', marginBottom: 16 }}>🎓 Tense Mastery</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tenseProgress.map(t => (
            <div key={t.tense} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, width: 28 }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#3b1f4e' }}>{t.tense}</span>
                  <span style={{ fontSize: 12, color: t.completed ? '#16a34a' : '#9ca3af', fontWeight: 700 }}>
                    {t.completed ? '✅ Done!' : '⏳ In progress'}
                  </span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-fill" style={{ width: t.completed ? '100%' : '0%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary by category */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 900, fontSize: 17, color: '#3b1f4e', marginBottom: 16 }}>📚 Vocabulary Progress</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {Array.from(new Set(progress.vocab.map(w => w.category))).map(cat => {
            const catWords = progress.vocab.filter(w => w.category === cat);
            const catLearned = catWords.filter(w => w.repetitions > 0).length;
            return (
              <div key={cat} style={{ background: '#f9fafb', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#3b1f4e', marginBottom: 6, textTransform: 'capitalize' }}>{cat}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{catLearned}/{catWords.length} learned</div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(catLearned / catWords.length) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontWeight: 900, fontSize: 17, color: '#3b1f4e', marginBottom: 16 }}>🏅 Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {badges.map(badge => (
            <div key={badge.id} style={{
              background: badge.earned ? 'linear-gradient(135deg, #fce7f3, #f3e8ff)' : '#f9fafb',
              border: `2px solid ${badge.earned ? '#f9a8d4' : '#e5e7eb'}`,
              borderRadius: 14,
              padding: '14px',
              textAlign: 'center',
              opacity: badge.earned ? 1 : 0.5,
              transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 32, marginBottom: 6 }}>{badge.earned ? badge.emoji : '🔒'}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#3b1f4e', marginBottom: 4 }}>{badge.label}</div>
              <div style={{ fontSize: 11, color: '#7c4f9e', fontWeight: 600 }}>{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-ghost"
          onClick={() => { if (window.confirm('Are you sure? This will reset all your progress!')) resetProgress(); }}
          style={{ color: '#ef4444', fontSize: 13 }}
        >
          🗑️ Reset Progress
        </button>
      </div>
    </div>
  );
}
