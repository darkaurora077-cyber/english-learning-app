export type VerbTense = 'simple-present' | 'present-continuous' | 'simple-past' | 'past-continuous' | 'present-perfect' | 'future-will' | 'future-going-to';

export interface VocabWord {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  nextReview: number; // timestamp
  interval: number; // days
  easeFactor: number;
  repetitions: number;
  category: string;
}

export interface Exercise {
  id: string;
  type: 'fill-blank' | 'translate' | 'multiple-choice' | 'speaking' | 'reorder' | 'error-correction';
  tense?: VerbTense;
  prompt: string;
  answer: string;
  options?: string[];
  hint?: string;
  explanation?: string;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tense?: VerbTense;
  exercises: Exercise[];
  xp: number;
  estimatedMinutes: number;
}

export interface DailyPlan {
  day: number;
  theme: string;
  emoji: string;
  focusTense: VerbTense;
  lessonIds: string[];
  vocabIds: string[];
  reviewCount: number;
}

// ── VOCABULARY ────────────────────────────────────────────────────────────────
export const vocabBank: VocabWord[] = [
  { id: 'v1', word: 'gorgeous', phonetic: '/ˈɡɔːrdʒəs/', translation: 'lindo(a)', partOfSpeech: 'adj', example: "That dress is absolutely gorgeous!", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v2', word: 'exhausted', phonetic: '/ɪɡˈzɔːstɪd/', translation: 'exausto(a)', partOfSpeech: 'adj', example: "I'm completely exhausted after work.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'feelings' },
  { id: 'v3', word: 'apparently', phonetic: '/əˈpærəntli/', translation: 'aparentemente', partOfSpeech: 'adv', example: "Apparently she already left.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adverbs' },
  { id: 'v4', word: 'frustrated', phonetic: '/ˈfrʌstreɪtɪd/', translation: 'frustrado(a)', partOfSpeech: 'adj', example: "I get frustrated when I make mistakes.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'feelings' },
  { id: 'v5', word: 'eventually', phonetic: '/ɪˈventʃuəli/', translation: 'eventualmente / no final', partOfSpeech: 'adv', example: "She eventually learned to drive.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adverbs' },
  { id: 'v6', word: 'throughout', phonetic: '/θruːˈaʊt/', translation: 'ao longo de', partOfSpeech: 'prep', example: "She studied throughout the night.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'prepositions' },
  { id: 'v7', word: 'accomplish', phonetic: '/əˈkɒmplɪʃ/', translation: 'realizar / conquistar', partOfSpeech: 'verb', example: "You can accomplish anything you set your mind to.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'verbs' },
  { id: 'v8', word: 'vivid', phonetic: '/ˈvɪvɪd/', translation: 'vívido / intenso', partOfSpeech: 'adj', example: "I had a vivid dream last night.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v9', word: 'stubborn', phonetic: '/ˈstʌbərn/', translation: 'teimoso(a)', partOfSpeech: 'adj', example: "She's too stubborn to ask for help.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'personality' },
  { id: 'v10', word: 'overwhelmed', phonetic: '/ˌoʊvərˈwelmd/', translation: 'sobrecarregado(a)', partOfSpeech: 'adj', example: "I felt overwhelmed by all the tasks.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'feelings' },
  { id: 'v11', word: 'regardless', phonetic: '/rɪˈɡɑːrdləs/', translation: 'independentemente', partOfSpeech: 'adv', example: "I'll do it regardless of what they say.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adverbs' },
  { id: 'v12', word: 'genuine', phonetic: '/ˈdʒenjuɪn/', translation: 'genuíno / verdadeiro', partOfSpeech: 'adj', example: "Her smile was genuine and warm.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v13', word: 'consistent', phonetic: '/kənˈsɪstənt/', translation: 'consistente', partOfSpeech: 'adj', example: "Be consistent with your practice.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v14', word: 'hesitate', phonetic: '/ˈhezɪteɪt/', translation: 'hesitar', partOfSpeech: 'verb', example: "Don't hesitate to ask for help.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'verbs' },
  { id: 'v15', word: 'crucial', phonetic: '/ˈkruːʃəl/', translation: 'crucial', partOfSpeech: 'adj', example: "Practice is crucial for fluency.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v16', word: 'assume', phonetic: '/əˈsuːm/', translation: 'assumir / supor', partOfSpeech: 'verb', example: "Don't assume you know the answer.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'verbs' },
  { id: 'v17', word: 'eager', phonetic: '/ˈiːɡər/', translation: 'ansioso / empolgado', partOfSpeech: 'adj', example: "She's eager to learn new things.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'feelings' },
  { id: 'v18', word: 'awkward', phonetic: '/ˈɔːkwərd/', translation: 'constrangedor / desajeitado', partOfSpeech: 'adj', example: "That silence was so awkward.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adjectives' },
  { id: 'v19', word: 'manage', phonetic: '/ˈmænɪdʒ/', translation: 'conseguir / gerenciar', partOfSpeech: 'verb', example: "Did you manage to finish it?", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'verbs' },
  { id: 'v20', word: 'basically', phonetic: '/ˈbeɪsɪkli/', translation: 'basicamente', partOfSpeech: 'adv', example: "Basically, I need more time.", nextReview: Date.now(), interval: 1, easeFactor: 2.5, repetitions: 0, category: 'adverbs' },
];

// ── EXERCISES ─────────────────────────────────────────────────────────────────
export const allExercises: Exercise[] = [
  // Simple Present
  { id: 'e1', type: 'fill-blank', tense: 'simple-present', prompt: "She ___ (study) English every day.", answer: "studies", hint: "3rd person singular: add -s or -ies", explanation: "With he/she/it, add -s or change -y to -ies: study → studies.", xp: 10 },
  { id: 'e2', type: 'translate', tense: 'simple-present', prompt: "Eu não entendo essa pergunta.", answer: "I don't understand this question.", hint: "Use 'don't' for negation with I/you/we/they", xp: 15 },
  { id: 'e3', type: 'multiple-choice', tense: 'simple-present', prompt: "Which sentence is correct?", answer: "He doesn't like coffee.", options: ["He don't like coffee.", "He doesn't like coffee.", "He not like coffee.", "He doesn't likes coffee."], explanation: "Use 'doesn't' (does not) for he/she/it in negative sentences.", xp: 10 },
  { id: 'e4', type: 'speaking', tense: 'simple-present', prompt: "Describe your morning routine using: wake up, brush teeth, have breakfast, go to work/school.", answer: "I wake up at 7, brush my teeth, have breakfast and then go to work.", xp: 20 },
  { id: 'e5', type: 'error-correction', tense: 'simple-present', prompt: "Find and fix the error: \"She go to the gym every Monday.\"", answer: "She goes to the gym every Monday.", explanation: "3rd person singular (she) needs -es: go → goes.", xp: 15 },
  { id: 'e6', type: 'reorder', tense: 'simple-present', prompt: "Reorder: [always / She / forgets / her / keys]", answer: "She always forgets her keys.", hint: "Frequency adverbs go before the main verb", xp: 15 },

  // Present Continuous
  { id: 'e7', type: 'fill-blank', tense: 'present-continuous', prompt: "They ___ (watch) a movie right now.", answer: "are watching", hint: "am/is/are + verb-ing", xp: 10 },
  { id: 'e8', type: 'translate', tense: 'present-continuous', prompt: "Eu estou aprendendo inglês agora.", answer: "I am learning English right now.", xp: 15 },
  { id: 'e9', type: 'speaking', tense: 'present-continuous', prompt: "Look around you. Describe 3 things that are happening right now.", answer: "The sun is shining. My phone is charging. I am sitting at my desk.", xp: 20 },
  { id: 'e10', type: 'error-correction', tense: 'present-continuous', prompt: "Fix: \"I am study for my exam right now.\"", answer: "I am studying for my exam right now.", explanation: "Present continuous = am/is/are + verb+ing. Study → studying.", xp: 15 },

  // Simple Past
  { id: 'e11', type: 'fill-blank', tense: 'simple-past', prompt: "Yesterday, I ___ (go) to the supermarket.", answer: "went", hint: "go is an irregular verb", xp: 10 },
  { id: 'e12', type: 'translate', tense: 'simple-past', prompt: "Ela não me ligou ontem.", answer: "She didn't call me yesterday.", hint: "Use 'didn't' + base verb for negatives", xp: 15 },
  { id: 'e13', type: 'multiple-choice', tense: 'simple-past', prompt: "Choose the correct past form: \"We ___ (eat) pizza for dinner.\"", answer: "ate", options: ["eated", "ate", "eaten", "eating"], explanation: "Eat is irregular: eat → ate (past).", xp: 10 },
  { id: 'e14', type: 'speaking', tense: 'simple-past', prompt: "Talk about what you did last weekend. Use at least 4 sentences.", answer: "I woke up late. I watched a movie with my family. We had lunch together. I also went for a walk.", xp: 25 },
  { id: 'e15', type: 'error-correction', tense: 'simple-past', prompt: "Fix: \"She buyed a new dress last week.\"", answer: "She bought a new dress last week.", explanation: "Buy is irregular: buy → bought.", xp: 15 },
  { id: 'e16', type: 'reorder', tense: 'simple-past', prompt: "Reorder: [to / I / yesterday / didn't / go / school]", answer: "I didn't go to school yesterday.", xp: 15 },

  // Past Continuous
  { id: 'e17', type: 'fill-blank', tense: 'past-continuous', prompt: "When she called, I ___ (sleep).", answer: "was sleeping", hint: "was/were + verb-ing", xp: 10 },
  { id: 'e18', type: 'translate', tense: 'past-continuous', prompt: "Nós estávamos jantando quando a luz apagou.", answer: "We were having dinner when the lights went out.", xp: 20 },
  { id: 'e19', type: 'speaking', tense: 'past-continuous', prompt: "What were you doing yesterday at 8pm? Create 3 sentences.", answer: "I was watching TV. My mom was cooking dinner. My sister was talking on the phone.", xp: 20 },

  // Present Perfect
  { id: 'e20', type: 'fill-blank', tense: 'present-perfect', prompt: "I ___ (never / try) sushi before.", answer: "have never tried", hint: "have/has + past participle", xp: 15 },
  { id: 'e21', type: 'translate', tense: 'present-perfect', prompt: "Ela já terminou o dever de casa.", answer: "She has already finished her homework.", xp: 15 },
  { id: 'e22', type: 'multiple-choice', tense: 'present-perfect', prompt: "\"I ___ in London for 3 years.\" (I still live there)", answer: "have lived", options: ["lived", "have lived", "was living", "am living"], explanation: "Present perfect (have/has + past participle) for actions that started in the past and continue now.", xp: 10 },
  { id: 'e23', type: 'speaking', tense: 'present-perfect', prompt: "Share 3 things you have done this week using 'I have...'", answer: "I have studied English. I have cooked for my family. I have watched a great show.", xp: 25 },
  { id: 'e24', type: 'error-correction', tense: 'present-perfect', prompt: "Fix: \"She has went to the store already.\"", answer: "She has gone to the store already.", explanation: "Go is irregular: go → went (past) → gone (past participle).", xp: 15 },

  // Future
  { id: 'e25', type: 'fill-blank', tense: 'future-will', prompt: "Don't worry, I ___ (help) you with that.", answer: "will help", hint: "will + base verb for spontaneous decisions/promises", xp: 10 },
  { id: 'e26', type: 'translate', tense: 'future-going-to', prompt: "Ela vai se casar no próximo ano.", answer: "She is going to get married next year.", xp: 15 },
  { id: 'e27', type: 'multiple-choice', tense: 'future-will', prompt: "Which is a PROMISE? Choose the best sentence.", answer: "I will always be there for you.", options: ["I am going to call you.", "I will always be there for you.", "I am calling you tomorrow.", "I called you yesterday."], explanation: "'Will' is used for promises and spontaneous decisions.", xp: 10 },
  { id: 'e28', type: 'speaking', tense: 'future-going-to', prompt: "What are your plans for next month? Use 'I'm going to...' 3 times.", answer: "I'm going to practice English every day. I'm going to visit my family. I'm going to read more books.", xp: 25 },

  // Error correction - common mistakes
  { id: 'e29', type: 'error-correction', prompt: "Fix: \"I have 20 years old.\"", answer: "I am 20 years old.", explanation: "In English, we use 'to be' for age: I am 20. NOT 'have' like in Portuguese.", xp: 15 },
  { id: 'e30', type: 'error-correction', prompt: "Fix: \"She is more pretty than her sister.\"", answer: "She is prettier than her sister.", explanation: "Short adjectives use -er for comparison: pretty → prettier. NOT 'more pretty'.", xp: 15 },
  { id: 'e31', type: 'translate', prompt: "Depende.", answer: "It depends.", hint: "Always needs a subject in English!", explanation: "In English, all sentences need a subject. Unlike Portuguese, you can't drop it.", xp: 15 },
  { id: 'e32', type: 'fill-blank', prompt: "I really enjoy ___ (listen) to music.", answer: "listening", hint: "After 'enjoy', use verb+ing", explanation: "After enjoy/like/love/hate/finish, use gerund (-ing form).", xp: 10 },
  { id: 'e33', type: 'error-correction', prompt: "Fix: \"Yesterday I didn't ate lunch.\"", answer: "Yesterday I didn't eat lunch.", explanation: "After 'didn't', use the base form of the verb: eat (not ate).", xp: 15 },
  { id: 'e34', type: 'multiple-choice', prompt: "Choose the right preposition: \"I'm good ___ English.\"", answer: "at", options: ["in", "at", "on", "with"], explanation: "Good at (something): She's good at sports / I'm good at math.", xp: 10 },
  { id: 'e35', type: 'speaking', prompt: "Introduce yourself in English: name, where you're from, what you do, and one hobby.", answer: "My name is Ana. I'm from Brazil. I work as a teacher. In my free time, I love to dance.", xp: 30 },
];

// ── LESSONS ───────────────────────────────────────────────────────────────────
export const lessons: Lesson[] = [
  {
    id: 'l1', title: 'Simple Present Basics', emoji: '✨', tense: 'simple-present',
    description: 'Master everyday actions and habits!',
    exercises: ['e1','e2','e3','e4','e5','e6'].map(id => allExercises.find(e => e.id === id)!),
    xp: 80, estimatedMinutes: 12,
  },
  {
    id: 'l2', title: 'Present Continuous', emoji: '🎯', tense: 'present-continuous',
    description: "Talk about what's happening RIGHT NOW!",
    exercises: ['e7','e8','e9','e10'].map(id => allExercises.find(e => e.id === id)!),
    xp: 60, estimatedMinutes: 10,
  },
  {
    id: 'l3', title: 'Simple Past Adventures', emoji: '🌸', tense: 'simple-past',
    description: 'Tell stories about the past like a pro!',
    exercises: ['e11','e12','e13','e14','e15','e16'].map(id => allExercises.find(e => e.id === id)!),
    xp: 90, estimatedMinutes: 15,
  },
  {
    id: 'l4', title: 'Past Continuous', emoji: '🌙', tense: 'past-continuous',
    description: 'Describe ongoing past actions!',
    exercises: ['e17','e18','e19'].map(id => allExercises.find(e => e.id === id)!),
    xp: 55, estimatedMinutes: 10,
  },
  {
    id: 'l5', title: 'Present Perfect', emoji: '💫', tense: 'present-perfect',
    description: 'Connect the past to NOW!',
    exercises: ['e20','e21','e22','e23','e24'].map(id => allExercises.find(e => e.id === id)!),
    xp: 75, estimatedMinutes: 12,
  },
  {
    id: 'l6', title: 'Future Plans 🔮', emoji: '🔮', tense: 'future-will',
    description: 'Talk about what will happen!',
    exercises: ['e25','e26','e27','e28'].map(id => allExercises.find(e => e.id === id)!),
    xp: 65, estimatedMinutes: 10,
  },
  {
    id: 'l7', title: 'Fix Your Mistakes', emoji: '🛠️',
    description: 'The most common Portuguese→English errors!',
    exercises: ['e29','e30','e31','e32','e33','e34','e35'].map(id => allExercises.find(e => e.id === id)!),
    xp: 95, estimatedMinutes: 15,
  },
];

// ── 30-DAY PLAN ───────────────────────────────────────────────────────────────
export const dailyPlans: DailyPlan[] = [
  { day: 1, theme: "Fresh Start! 🌸", emoji: "🌸", focusTense: 'simple-present', lessonIds: ['l1'], vocabIds: ['v1','v2','v3'], reviewCount: 0 },
  { day: 2, theme: "Build the Habit ✨", emoji: "✨", focusTense: 'simple-present', lessonIds: ['l1'], vocabIds: ['v4','v5','v6'], reviewCount: 3 },
  { day: 3, theme: "Right Now! 🎯", emoji: "🎯", focusTense: 'present-continuous', lessonIds: ['l2'], vocabIds: ['v7','v8','v9'], reviewCount: 6 },
  { day: 4, theme: "Review Day 💜", emoji: "💜", focusTense: 'simple-present', lessonIds: ['l1','l2'], vocabIds: ['v1','v2','v4'], reviewCount: 9 },
  { day: 5, theme: "Story Time 🌙", emoji: "🌙", focusTense: 'simple-past', lessonIds: ['l3'], vocabIds: ['v10','v11','v12'], reviewCount: 6 },
  { day: 6, theme: "Past Explorer 🗺️", emoji: "🗺️", focusTense: 'simple-past', lessonIds: ['l3'], vocabIds: ['v13','v14','v15'], reviewCount: 9 },
  { day: 7, theme: "Week 1 Win! 🏆", emoji: "🏆", focusTense: 'simple-past', lessonIds: ['l1','l3'], vocabIds: ['v5','v6','v7'], reviewCount: 12 },
  { day: 8, theme: "What Was Happening 🌊", emoji: "🌊", focusTense: 'past-continuous', lessonIds: ['l4'], vocabIds: ['v16','v17','v18'], reviewCount: 9 },
  { day: 9, theme: "Mix & Match 🎨", emoji: "🎨", focusTense: 'past-continuous', lessonIds: ['l3','l4'], vocabIds: ['v19','v20'], reviewCount: 12 },
  { day: 10, theme: "Mini Review 🔁", emoji: "🔁", focusTense: 'simple-present', lessonIds: ['l1','l2','l4'], vocabIds: ['v1','v3','v8'], reviewCount: 15 },
  { day: 11, theme: "Connect to Now 💫", emoji: "💫", focusTense: 'present-perfect', lessonIds: ['l5'], vocabIds: ['v2','v4','v9'], reviewCount: 9 },
  { day: 12, theme: "Have You Ever? 🌍", emoji: "🌍", focusTense: 'present-perfect', lessonIds: ['l5'], vocabIds: ['v10','v12','v14'], reviewCount: 12 },
  { day: 13, theme: "Fix Your Errors 🛠️", emoji: "🛠️", focusTense: 'simple-present', lessonIds: ['l7'], vocabIds: ['v11','v13','v15'], reviewCount: 12 },
  { day: 14, theme: "Week 2 Champion! 👑", emoji: "👑", focusTense: 'present-perfect', lessonIds: ['l5','l7'], vocabIds: ['v16','v17'], reviewCount: 15 },
  { day: 15, theme: "Future Dreams 🔮", emoji: "🔮", focusTense: 'future-will', lessonIds: ['l6'], vocabIds: ['v18','v19','v20'], reviewCount: 12 },
  { day: 16, theme: "Plans & Goals 🎯", emoji: "🎯", focusTense: 'future-going-to', lessonIds: ['l6'], vocabIds: ['v1','v5','v7'], reviewCount: 15 },
  { day: 17, theme: "Super Review 🌟", emoji: "🌟", focusTense: 'simple-past', lessonIds: ['l3','l5'], vocabIds: ['v2','v6','v13'], reviewCount: 18 },
  { day: 18, theme: "Error Buster 💥", emoji: "💥", focusTense: 'simple-present', lessonIds: ['l7'], vocabIds: ['v8','v9','v11'], reviewCount: 15 },
  { day: 19, theme: "Speak Up! 🗣️", emoji: "🗣️", focusTense: 'present-continuous', lessonIds: ['l2','l4'], vocabIds: ['v3','v10','v14'], reviewCount: 18 },
  { day: 20, theme: "Halfway Hero! 🎉", emoji: "🎉", focusTense: 'present-perfect', lessonIds: ['l5','l6'], vocabIds: ['v15','v16','v20'], reviewCount: 20 },
  { day: 21, theme: "Deep Dive 🌊", emoji: "🌊", focusTense: 'simple-past', lessonIds: ['l3','l4'], vocabIds: ['v17','v18','v19'], reviewCount: 18 },
  { day: 22, theme: "Tense Master 🏅", emoji: "🏅", focusTense: 'future-will', lessonIds: ['l6','l7'], vocabIds: ['v1','v4','v7'], reviewCount: 20 },
  { day: 23, theme: "Vocabulary Boost 📚", emoji: "📚", focusTense: 'present-perfect', lessonIds: ['l5'], vocabIds: ['v2','v5','v8','v11'], reviewCount: 20 },
  { day: 24, theme: "Polish Your English ✨", emoji: "✨", focusTense: 'simple-present', lessonIds: ['l1','l7'], vocabIds: ['v3','v6','v9','v12'], reviewCount: 22 },
  { day: 25, theme: "Final Push 💪", emoji: "💪", focusTense: 'past-continuous', lessonIds: ['l4','l5'], vocabIds: ['v13','v14','v15','v16'], reviewCount: 22 },
  { day: 26, theme: "Almost There! 🌈", emoji: "🌈", focusTense: 'future-going-to', lessonIds: ['l6','l7'], vocabIds: ['v17','v18','v19','v20'], reviewCount: 25 },
  { day: 27, theme: "Fluency Sprint 🏃", emoji: "🏃", focusTense: 'simple-past', lessonIds: ['l3','l4','l5'], vocabIds: ['v1','v3','v5','v7'], reviewCount: 25 },
  { day: 28, theme: "Week 4 Legend! 🦋", emoji: "🦋", focusTense: 'present-perfect', lessonIds: ['l5','l6','l7'], vocabIds: ['v2','v4','v6','v8'], reviewCount: 25 },
  { day: 29, theme: "Grand Review 🎊", emoji: "🎊", focusTense: 'simple-present', lessonIds: ['l1','l2','l3','l5'], vocabIds: ['v9','v10','v11','v12'], reviewCount: 30 },
  { day: 30, theme: "You Made It! 🏆✨", emoji: "🏆", focusTense: 'future-will', lessonIds: ['l1','l3','l5','l6','l7'], vocabIds: ['v13','v14','v15','v20'], reviewCount: 30 },
];

// SM-2 Algorithm for spaced repetition
export function sm2(card: VocabWord, quality: 0|1|2|3|4|5): VocabWord {
  let { easeFactor, interval, repetitions } = card;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextReview = Date.now() + interval * 86400000;
  return { ...card, easeFactor, interval, repetitions, nextReview };
}
