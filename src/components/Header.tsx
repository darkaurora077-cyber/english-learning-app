import React from 'react';
import { Flame, Star, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { progress, level, xpInLevel, xpToNext } = useStore();

  const navItems = [
    { id: 'home', label: '🏠 Home' },
    { id: 'daily', label: '📅 Daily Plan' },
    { id: 'lessons', label: '📖 Lessons' },
    { id: 'vocab', label: '🃏 Vocabulary' },
    { id: 'speaking', label: '🎤 Speaking' },
    { id: 'progress', label: '📊 Progress' },
  ];

  return (
    <header style={{
      background: 'white',
      borderBottom: '2px solid var(--pink-100)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 16px rgba(236,72,153,0.08)',
    }}>
      {/* Top bar */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        {/* Logo */}
        <button onClick={() => onNavigate('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ fontSize: 28 }} className="animate-float">🌸</span>
          <span style={{ fontFamily: 'Pacifico, cursive', fontSize: 22, background: 'linear-gradient(135deg, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            FluentMe
          </span>
        </button>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff7ed', borderRadius: 99, padding: '6px 14px', border: '1.5px solid #fed7aa' }}>
            <Flame size={16} color="#f97316" fill="#f97316" />
            <span style={{ fontWeight: 800, color: '#ea580c', fontSize: 14 }}>{progress.streak}</span>
            <span style={{ color: '#9a3412', fontSize: 12, fontWeight: 600 }}>streak</span>
          </div>

          {/* XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--purple-100)', borderRadius: 99, padding: '6px 14px', border: '1.5px solid var(--purple-200)' }}>
            <Zap size={16} color="#a855f7" fill="#a855f7" />
            <span style={{ fontWeight: 800, color: '#7e22ce', fontSize: 14 }}>{progress.xp}</span>
            <span style={{ color: '#6b21a8', fontSize: 12, fontWeight: 600 }}>XP</span>
          </div>

          {/* Level */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--pink-100)', borderRadius: 99, padding: '6px 14px', border: '1.5px solid var(--pink-200)' }}>
            <Star size={16} color="#ec4899" fill="#ec4899" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 800, color: '#be185d', fontSize: 13 }}>Lv {level}</span>
              </div>
              <div style={{ width: 60, height: 5, background: '#fce7f3', borderRadius: 99 }}>
                <div style={{ width: `${(xpInLevel / xpToNext) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f472b6, #c084fc)', borderRadius: 99 }} />
              </div>
            </div>
          </div>

          {/* Day */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg, var(--pink-100), var(--purple-100))', borderRadius: 99, padding: '6px 14px', border: '1.5px solid var(--purple-200)' }}>
            <span style={{ fontWeight: 800, color: '#7e22ce', fontSize: 13 }}>Day {progress.currentDay}/30</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        gap: 4,
        overflowX: 'auto',
      }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              background: currentPage === item.id ? 'linear-gradient(135deg, var(--pink-100), var(--purple-100))' : 'transparent',
              border: 'none',
              borderBottom: currentPage === item.id ? '3px solid #a855f7' : '3px solid transparent',
              padding: '10px 16px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              color: currentPage === item.id ? '#7e22ce' : '#7c4f9e',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
