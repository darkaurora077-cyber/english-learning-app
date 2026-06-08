import React, { useState } from 'react';
import './index.css';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { DailyPlanPage } from './pages/DailyPlanPage';
import { LessonsPage } from './pages/LessonsPage';
import { VocabPage } from './pages/VocabPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { ProgressPage } from './pages/ProgressPage';

type Page = 'home' | 'daily' | 'lessons' | 'vocab' | 'speaking' | 'progress';

function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => setPage(p as Page);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'daily': return <DailyPlanPage onNavigate={navigate} />;
      case 'lessons': return <LessonsPage onNavigate={navigate} />;
      case 'vocab': return <VocabPage />;
      case 'speaking': return <SpeakingPage />;
      case 'progress': return <ProgressPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header onNavigate={navigate} currentPage={page} />
      <main style={{ paddingBottom: 40 }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
