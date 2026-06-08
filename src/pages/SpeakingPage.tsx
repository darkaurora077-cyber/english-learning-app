import React, { useState } from 'react';
import { Mic, ChevronRight, RefreshCw, Check, Volume2, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Confetti } from '../components/Confetti';

interface SpeakingPrompt {
  id: string;
  category: string;
  emoji: string;
  prompt: string;
  tense: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hints: string[];
  sampleAnswer: string;
  xp: number;
}

const speakingPrompts: SpeakingPrompt[] = [
  {
    id: 's1', category: 'Daily Life', emoji: '☀️', tense: 'Simple Present',
    difficulty: 'easy', xp: 25,
    prompt: "Describe your typical morning routine. What do you do before leaving home?",
    hints: ["Start with: I wake up at...", "Use: then, after that, next, finally", "Include at least 5 activities"],
    sampleAnswer: "I wake up at 7am. First, I brush my teeth and take a shower. Then I make coffee and have breakfast. After that, I get dressed and check my phone. Finally, I leave for work around 8:30.",
  },
  {
    id: 's2', category: 'Daily Life', emoji: '🌙', tense: 'Simple Past',
    difficulty: 'easy', xp: 25,
    prompt: "Tell me about your day yesterday. What did you do from morning to night?",
    hints: ["Use past tense: went, ate, watched, talked", "Use time expressions: in the morning, at noon, in the evening", "Include: how you felt about the day"],
    sampleAnswer: "Yesterday was a busy day. In the morning I went to work and had several meetings. At noon I ate lunch with a friend. In the evening I watched a movie and went to bed early because I was exhausted.",
  },
  {
    id: 's3', category: 'Plans', emoji: '🔮', tense: 'Future (going to)',
    difficulty: 'easy', xp: 25,
    prompt: "What are your plans for this weekend? Describe at least 3 things you're going to do.",
    hints: ["I'm going to...", "We're going to...", "Include: where, who with, why you're excited"],
    sampleAnswer: "This weekend I'm going to relax at home on Saturday. I'm going to watch a new series with my sister. On Sunday we're going to visit our parents for lunch. I'm also going to start reading a new book.",
  },
  {
    id: 's4', category: 'Experiences', emoji: '✈️', tense: 'Present Perfect',
    difficulty: 'medium', xp: 35,
    prompt: "Talk about a place you have visited. What did you see? Would you go back?",
    hints: ["I have been to...", "I have never been to... but I want to go", "Include: what it was like, what you did there"],
    sampleAnswer: "I have been to São Paulo a few times. It's an amazing city. I have visited the Ibirapuera park and several museums. I have also tried many different restaurants there. I would definitely go back because there's always something new to discover.",
  },
  {
    id: 's5', category: 'Opinions', emoji: '💭', tense: 'Simple Present',
    difficulty: 'medium', xp: 35,
    prompt: "What do you think about social media? Is it good or bad? Give 3 reasons.",
    hints: ["I think... / I believe...", "On one hand... on the other hand...", "In my opinion..."],
    sampleAnswer: "I think social media has both good and bad sides. On one hand, it helps us stay connected with friends and family. It also helps people find jobs and share their work. On the other hand, I believe it can be addictive and people compare themselves too much. In my opinion, the key is to use it in moderation.",
  },
  {
    id: 's6', category: 'Storytelling', emoji: '📖', tense: 'Past Continuous + Simple Past',
    difficulty: 'medium', xp: 40,
    prompt: "Tell a short story about something unexpected that happened to you. Use past continuous AND simple past.",
    hints: ["While I was [doing X], suddenly...", "I was walking when...", "At the time, I didn't know that..."],
    sampleAnswer: "One day I was walking to the supermarket when it suddenly started raining very hard. I was wearing new shoes and I didn't have an umbrella. While I was trying to find shelter, I met an old friend I hadn't seen in years. We ended up having coffee together and talking for hours. It was a great afternoon despite the bad start!",
  },
  {
    id: 's7', category: 'Future Dreams', emoji: '⭐', tense: 'Future (will + going to)',
    difficulty: 'medium', xp: 35,
    prompt: "Where do you see yourself in 5 years? Talk about your goals and dreams.",
    hints: ["In five years, I will...", "I'm going to work towards...", "I hope to..."],
    sampleAnswer: "In five years, I will be fluent in English and probably Spanish too. I'm going to focus on my career and try to get a promotion. I also want to travel more. I will save money to visit at least 3 new countries. I hope to have my own apartment by then as well.",
  },
  {
    id: 's8', category: 'Daily Life', emoji: '🍕', tense: 'Present Perfect + Simple Past',
    difficulty: 'hard', xp: 50,
    prompt: "Talk about your food preferences. What have you tried that you loved? What have you never tried but want to?",
    hints: ["I have always loved...", "I tried [food] for the first time when...", "I have never tried... but I want to because..."],
    sampleAnswer: "I have always loved Italian food. I tried tiramisu for the first time when I was visiting a restaurant in São Paulo and it was incredible. I have eaten sushi many times and I love it. However, I have never tried Ethiopian food but I really want to because I heard it's very flavorful and different from anything I've had.",
  },
  {
    id: 's9', category: 'Opinions', emoji: '📱', tense: 'Simple Present + Future',
    difficulty: 'hard', xp: 50,
    prompt: "How do you think technology will change education in the future? Give specific examples.",
    hints: ["Currently, technology...", "In the future, I think...", "I believe AI will..."],
    sampleAnswer: "Currently, technology already plays a big role in education. Students use apps and online videos to learn. In the future, I think virtual reality will allow students to visit historical places without leaving the classroom. I believe AI will create personalized lesson plans for each student. Teachers will focus more on mentoring and less on explaining basic concepts.",
  },
  {
    id: 's10', category: 'Personal', emoji: '💪', tense: 'Mixed tenses',
    difficulty: 'hard', xp: 55,
    prompt: "Talk about a challenge you faced and overcame. What happened, what did you do, and what did you learn?",
    hints: ["A few years ago, I was...", "The biggest challenge was...", "I learned that... / This experience taught me..."],
    sampleAnswer: "A few years ago, I was struggling with anxiety. The biggest challenge was that I didn't want to talk about it. I started going to therapy and I also began exercising regularly. It was a slow process, but I gradually felt better. I learned that asking for help is a sign of strength, not weakness. This experience taught me to be more patient with myself and others.",
  },
];

type SessionState = 'pick' | 'speaking' | 'feedback' | 'complete';

export function SpeakingPage() {
  const { addXP } = useStore();
  const [sessionState, setSessionState] = useState<SessionState>('pick');
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [selfRating, setSelfRating] = useState<number | null>(null);
  const [sessionPrompts, setSessionPrompts] = useState<SpeakingPrompt[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filtered = speakingPrompts.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    (diffFilter === 'all' || p.difficulty === diffFilter)
  );

  const categories = ['all', ...Array.from(new Set(speakingPrompts.map(p => p.category)))];

  const startSession = (prompts: SpeakingPrompt[]) => {
    setSessionPrompts(prompts);
    setCurrentPromptIdx(0);
    setUserResponse('');
    setShowSample(false);
    setSelfRating(null);
    setCompletedCount(0);
    setSessionState('speaking');
  };

  const handleSubmitResponse = () => {
    setSessionState('feedback');
  };

  const handleRate = (rating: number) => {
    setSelfRating(rating);
    const xp = Math.round(sessionPrompts[currentPromptIdx].xp * (rating / 5));
    addXP(xp);
  };

  const handleNext = () => {
    setCompletedCount(c => c + 1);
    if (currentPromptIdx + 1 >= sessionPrompts.length) {
      setShowConfetti(true);
      setSessionState('complete');
    } else {
      setCurrentPromptIdx(i => i + 1);
      setUserResponse('');
      setShowSample(false);
      setSelfRating(null);
      setSessionState('speaking');
    }
  };

  const diffColors = {
    easy: { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' },
    medium: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
    hard: { bg: '#fdf2f8', border: '#f9a8d4', text: '#be185d' },
  };

  if (sessionState === 'complete') {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px', textAlign: 'center' }} className="animate-bounce-in">
        <Confetti active={showConfetti} />
        <div style={{ fontSize: 80, marginBottom: 16 }}>🎤✨</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#3b1f4e', marginBottom: 8 }}>Speaking Session Done!</h2>
        <p style={{ color: '#7c4f9e', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
          You completed {completedCount + 1} speaking exercises!
        </p>
        <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>
          Speaking out loud is the most important thing you can do for fluency. Keep it up! 💪
        </p>
        <button className="btn-primary" onClick={() => setSessionState('pick')}>
          Practice More 🌸
        </button>
      </div>
    );
  }

  if (sessionState === 'speaking' || sessionState === 'feedback') {
    const prompt = sessionPrompts[currentPromptIdx];
    const dc = diffColors[prompt.difficulty];

    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <button className="btn-ghost" onClick={() => setSessionState('pick')}>← Back</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#3b1f4e' }}>Speaking Practice</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{currentPromptIdx + 1} / {sessionPrompts.length}</div>
          </div>
          <div />
        </div>

        <div className="progress-bar" style={{ marginBottom: 24 }}>
          <div className="progress-fill" style={{ width: `${(currentPromptIdx / sessionPrompts.length) * 100}%` }} />
        </div>

        {/* Prompt card */}
        <div style={{ background: 'linear-gradient(135deg, #fce7f3, #f3e8ff)', border: '2px solid var(--pink-200)', borderRadius: 20, padding: '28px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: 'white', borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: '#7e22ce' }}>
              🕐 {prompt.tense}
            </span>
            <span style={{ background: dc.bg, border: `1px solid ${dc.border}`, borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: dc.text }}>
              {prompt.difficulty}
            </span>
            <span style={{ background: '#f3e8ff', borderRadius: 99, padding: '4px 12px', fontSize: 12, fontWeight: 700, color: '#7e22ce' }}>
              +{prompt.xp} XP
            </span>
          </div>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{prompt.emoji}</div>
          <p style={{ fontSize: 18, fontWeight: 800, color: '#3b1f4e', lineHeight: 1.5 }}>{prompt.prompt}</p>
        </div>

        {/* Hints */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontWeight: 800, color: '#92400e', fontSize: 13, marginBottom: 8 }}>💡 Tips to help you:</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {prompt.hints.map((h, i) => (
              <li key={i} style={{ color: '#78350f', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{h}</li>
            ))}
          </ul>
        </div>

        {sessionState === 'speaking' ? (
          <>
            <div style={{ background: '#f3e8ff', borderRadius: 14, padding: '16px', marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: '#7e22ce', fontWeight: 700, marginBottom: 10 }}>
                🎤 Speak out loud first, then write what you said:
              </p>
              <textarea
                value={userResponse}
                onChange={e => setUserResponse(e.target.value)}
                placeholder="Say it out loud, then type your response here..."
                rows={5}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  border: '2px solid var(--purple-200)', fontFamily: 'Nunito, sans-serif',
                  fontSize: 15, lineHeight: 1.6, resize: 'vertical', background: 'white',
                  color: '#3b1f4e', outline: 'none',
                }}
              />
            </div>
            <button className="btn-primary" onClick={handleSubmitResponse} disabled={!userResponse.trim()} style={{ width: '100%' }}>
              See Feedback ✨
            </button>
          </>
        ) : (
          <>
            {/* User's response */}
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 14, padding: '14px 18px', marginBottom: 16 }}>
              <div style={{ fontWeight: 800, color: '#3b1f4e', fontSize: 13, marginBottom: 8 }}>Your response:</div>
              <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>{userResponse}</p>
            </div>

            {/* Sample answer */}
            <button className="btn-secondary" onClick={() => setShowSample(s => !s)} style={{ marginBottom: 12, width: '100%', justifyContent: 'center' }}>
              {showSample ? '🙈 Hide sample' : '👀 Show sample answer'}
            </button>
            {showSample && (
              <div style={{ background: '#f0fdf4', border: '2px solid #86efac', borderRadius: 14, padding: '14px 18px', marginBottom: 16 }} className="animate-slide-up">
                <div style={{ fontWeight: 800, color: '#15803d', fontSize: 13, marginBottom: 8 }}>✅ Sample answer:</div>
                <p style={{ color: '#166534', fontSize: 15, lineHeight: 1.6, fontStyle: 'italic' }}>"{prompt.sampleAnswer}"</p>
              </div>
            )}

            {/* Self-rating */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 800, color: '#3b1f4e', fontSize: 15, marginBottom: 12 }}>How did you do? Rate yourself honestly:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {[1,2,3,4,5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleRate(rating)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 12,
                      border: `2px solid ${selfRating === rating ? '#a855f7' : '#e5e7eb'}`,
                      background: selfRating === rating ? '#f3e8ff' : 'white',
                      fontFamily: 'Nunito',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 18 }}>{'⭐'.repeat(rating)}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: selfRating === rating ? '#7e22ce' : '#9ca3af', marginTop: 4 }}>
                      {rating === 1 ? 'Hard' : rating === 2 ? 'OK' : rating === 3 ? 'Good' : rating === 4 ? 'Great' : 'Perfect'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={handleNext} style={{ width: '100%' }} disabled={!selfRating}>
              {currentPromptIdx + 1 >= sessionPrompts.length ? 'Finish Session 🎉' : 'Next Prompt →'}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 20px' }} className="animate-slide-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#3b1f4e', marginBottom: 4 }}>🎤 Speaking Practice</h1>
        <p style={{ color: '#7c4f9e', fontWeight: 600 }}>Speak out loud — it's the fastest path to fluency!</p>
      </div>

      {/* Quick sessions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Quick Practice', emoji: '⚡', count: 3, desc: '3 easy prompts, ~10 min', prompts: speakingPrompts.filter(p => p.difficulty === 'easy').slice(0,3) },
          { label: 'Daily Challenge', emoji: '🎯', count: 5, desc: '5 mixed prompts, ~20 min', prompts: [...speakingPrompts].sort(() => Math.random()-0.5).slice(0,5) },
          { label: 'Fluency Sprint', emoji: '🏃', count: 10, desc: 'All levels, ~40 min', prompts: [...speakingPrompts].sort(() => Math.random()-0.5) },
        ].map(session => (
          <button
            key={session.label}
            onClick={() => startSession(session.prompts)}
            style={{
              background: 'linear-gradient(135deg, var(--pink-100), var(--purple-100))',
              border: '2px solid var(--purple-200)',
              borderRadius: 16,
              padding: '20px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'Nunito',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{session.emoji}</div>
            <div style={{ fontWeight: 900, fontSize: 15, color: '#3b1f4e', marginBottom: 4 }}>{session.label}</div>
            <div style={{ fontSize: 12, color: '#7c4f9e', fontWeight: 600 }}>{session.desc}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)} style={{ padding: '5px 12px', borderRadius: 99, border: `2px solid ${categoryFilter === cat ? '#a855f7' : '#e5e7eb'}`, background: categoryFilter === cat ? '#f3e8ff' : 'white', fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: categoryFilter === cat ? '#7e22ce' : '#6b7280' }}>
            {cat}
          </button>
        ))}
        {(['all','easy','medium','hard'] as const).map(d => (
          <button key={d} onClick={() => setDiffFilter(d)} style={{ padding: '5px 12px', borderRadius: 99, border: `2px solid ${diffFilter === d ? '#ec4899' : '#e5e7eb'}`, background: diffFilter === d ? '#fce7f3' : 'white', fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, cursor: 'pointer', color: diffFilter === d ? '#be185d' : '#6b7280' }}>
            {d}
          </button>
        ))}
      </div>

      {/* Prompt cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(prompt => {
          const dc = diffColors[prompt.difficulty];
          return (
            <div
              key={prompt.id}
              className="card"
              onClick={() => startSession([prompt])}
              style={{ cursor: 'pointer' }}
              onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ background: '#fce7f3', color: '#be185d', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{prompt.category}</span>
                <span style={{ background: dc.bg, border: `1px solid ${dc.border}`, color: dc.text, borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{prompt.difficulty}</span>
              </div>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{prompt.emoji}</div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#3b1f4e', marginBottom: 10, lineHeight: 1.5 }}>{prompt.prompt}</p>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ background: '#f3e8ff', color: '#7e22ce', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>⭐ +{prompt.xp} XP</span>
                <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🎤 {prompt.tense}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const diffColors = {
  easy: { bg: '#f0fdf4', border: '#86efac', text: '#16a34a' },
  medium: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  hard: { bg: '#fdf2f8', border: '#f9a8d4', text: '#be185d' },
};
