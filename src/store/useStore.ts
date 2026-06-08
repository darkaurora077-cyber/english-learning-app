import { useState, useEffect, useCallback } from 'react';
import { VocabWord, vocabBank, sm2 } from '../data/lessonData';

export interface UserProgress {
  currentDay: number;
  xp: number;
  streak: number;
  lastStudyDate: string;
  completedLessons: string[];
  completedExercises: string[];
  vocab: VocabWord[];
  badges: string[];
  totalMinutes: number;
}

const DEFAULT_PROGRESS: UserProgress = {
  currentDay: 1,
  xp: 0,
  streak: 0,
  lastStudyDate: '',
  completedLessons: [],
  completedExercises: [],
  vocab: vocabBank,
  badges: [],
  totalMinutes: 0,
};

const STORAGE_KEY = 'english_app_progress';

function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT_PROGRESS;
}

function saveProgress(p: UserProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

// Singleton state (simple global store without Redux)
let _progress: UserProgress = loadProgress();
let _listeners: Array<() => void> = [];

function notify() { _listeners.forEach(fn => fn()); }

export function useStore() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const listener = () => forceRender(n => n + 1);
    _listeners.push(listener);
    return () => { _listeners = _listeners.filter(l => l !== listener); };
  }, []);

  const progress = _progress;

  const addXP = useCallback((amount: number) => {
    const today = new Date().toDateString();
    const wasYesterday = _progress.lastStudyDate === new Date(Date.now() - 86400000).toDateString();
    const newStreak = _progress.lastStudyDate === today
      ? _progress.streak
      : wasYesterday ? _progress.streak + 1 : 1;
    _progress = {
      ..._progress,
      xp: _progress.xp + amount,
      streak: newStreak,
      lastStudyDate: today,
    };
    saveProgress(_progress);
    notify();
  }, []);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    if (_progress.completedLessons.includes(lessonId)) return;
    _progress = {
      ..._progress,
      completedLessons: [..._progress.completedLessons, lessonId],
      xp: _progress.xp + xp,
      lastStudyDate: new Date().toDateString(),
    };
    saveProgress(_progress);
    notify();
  }, []);

  const completeExercise = useCallback((exerciseId: string, xp: number) => {
    if (_progress.completedExercises.includes(exerciseId)) return;
    _progress = {
      ..._progress,
      completedExercises: [..._progress.completedExercises, exerciseId],
    };
    addXP(xp);
  }, [addXP]);

  const reviewVocab = useCallback((wordId: string, quality: 0|1|2|3|4|5) => {
    _progress = {
      ..._progress,
      vocab: _progress.vocab.map(w => w.id === wordId ? sm2(w, quality) : w),
    };
    saveProgress(_progress);
    notify();
  }, []);

  const advanceDay = useCallback(() => {
    _progress = { ..._progress, currentDay: Math.min(_progress.currentDay + 1, 30) };
    saveProgress(_progress);
    notify();
  }, []);

  const getDueVocab = useCallback((): VocabWord[] => {
    return _progress.vocab.filter(w => w.nextReview <= Date.now());
  }, []);

  const resetProgress = useCallback(() => {
    _progress = DEFAULT_PROGRESS;
    saveProgress(_progress);
    notify();
  }, []);

  const level = Math.floor(progress.xp / 500) + 1;
  const xpInLevel = progress.xp % 500;
  const xpToNext = 500;

  return {
    progress, addXP, completeLesson, completeExercise,
    reviewVocab, advanceDay, getDueVocab, resetProgress,
    level, xpInLevel, xpToNext,
  };
}
