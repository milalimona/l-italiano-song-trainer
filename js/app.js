import { songData } from './song-data.js?v=29';
import { createSessionState, createStateStore } from './state.js?v=29';
import { createLyricsView, setAllTranslations } from './lyrics.js?v=29';
import { createYouTubePlayer, linePlaybackStart } from './player.js?v=29';
import { completionPercent, renderExercise, renderTrainingMenu, summaryProgress } from './exercises.js?v=29';

const store = createStateStore(localStorage, `trainer:v3:${songData.id}`);
let state = createSessionState(store.load());
let playerApi = null;

const views = [...document.querySelectorAll('.view')];
const lyricsRoot = document.querySelector('#lyrics-root');
const fallback = document.querySelector('#youtube-fallback');

function save(nextState = state) {
  state = nextState;
  store.save(state);
  updateProgress();
}

function showView(id) {
  views.forEach(view => view.classList.toggle('is-active', view.id === id));
  document.body.dataset.view = id;
}

function updateProgress() {
  const totalExercises = songData.exerciseSections.reduce((sum, section) => sum + section.exercises.length, 0);
  const percent = completionPercent(state.completedExercises, totalExercises);
  document.querySelector('#progress-bar').style.width = `${Math.max(6, percent)}%`;
}

const lyricsView = createLyricsView({
  root: lyricsRoot,
  sections: songData.sections,
  state,
  scrollContainer: document.querySelector('#listen-view'),
  anchorElement: document.querySelector('.media-panel'),
  onSeek(start, end) {
    if (playerApi) playerApi.seekTo(linePlaybackStart(start));
  },
  onStateChange(next) { save(next); }
});

const revealButton = document.querySelector('#reveal-all-button');
revealButton.addEventListener('click', () => {
  state = setAllTranslations(state, !state.revealAll);
  revealButton.textContent = state.revealAll ? 'скрыть перевод' : 'показать перевод';
  revealButton.setAttribute('aria-pressed', String(state.revealAll));
  save();
  lyricsView.setState(state);
});

const autoscrollButton = document.querySelector('#autoscroll-button');
autoscrollButton.addEventListener('click', () => {
  state = { ...state, autoScroll: !state.autoScroll };
  autoscrollButton.classList.toggle('is-selected', state.autoScroll);
  autoscrollButton.setAttribute('aria-pressed', String(state.autoScroll));
  save();
  lyricsView.setState(state);
});

function buildHistoryCard({ includeActions = false } = {}) {
  const card = document.createElement('article');
  card.className = 'history-card';
  const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'STORIA · A1–A2';
  const title = document.createElement('h2'); title.textContent = 'La storia della canzone';
  const revealHistory = document.createElement('button');
  revealHistory.type = 'button'; revealHistory.className = 'pill-button history-reveal-all'; revealHistory.textContent = 'показать перевод';
  const textGrid = document.createElement('div'); textGrid.className = 'history-text-grid';
  songData.history.sentences.forEach((sentence, index) => {
    const row = document.createElement('div'); row.className = 'history-row';
    const italian = document.createElement('p'); italian.className = 'history-it'; italian.textContent = sentence.it;
    const russian = document.createElement('button'); russian.type = 'button'; russian.className = 'history-ru'; russian.textContent = sentence.ru;
    russian.setAttribute('aria-label', `Показать перевод предложения ${index + 1}`);
    russian.addEventListener('click', () => {
      const revealed = russian.classList.toggle('is-revealed');
      russian.setAttribute('aria-label', `${revealed ? 'Скрыть' : 'Показать'} перевод предложения ${index + 1}`);
    });
    row.append(italian, russian);
    textGrid.append(row);
  });
  revealHistory.addEventListener('click', () => {
    const translations = [...textGrid.querySelectorAll('.history-ru')];
    const reveal = translations.some(item => !item.classList.contains('is-revealed'));
    translations.forEach(item => item.classList.toggle('is-revealed', reveal));
    revealHistory.textContent = reveal ? 'скрыть перевод' : 'показать перевод';
  });
  const historyHeading = document.createElement('div'); historyHeading.className = 'history-heading'; historyHeading.append(eyebrow, title, revealHistory);
  card.append(historyHeading, textGrid);

  if (includeActions) {
    const sources = document.createElement('p'); sources.className = 'history-sources'; sources.append('Источники: ');
    songData.history.sources.forEach((item, index) => {
      const link = document.createElement('a'); link.href = item.url; link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = item.label;
      sources.append(link, index < songData.history.sources.length - 1 ? ' · ' : '');
    });
    card.append(sources);
  }
  const exercises = document.createElement('button');
  exercises.type = 'button'; exercises.className = 'training-cta history-training-cta'; exercises.textContent = 'ПЕРЕЙТИ К УПРАЖНЕНИЯМ →';
  exercises.addEventListener('click', openTrainingMenu);
  card.append(exercises);
  return card;
}

document.querySelector('#inline-history-root').append(buildHistoryCard());

function openTrainingMenu() {
  renderTrainingMenu({
    root: document.querySelector('#training-menu'),
    sections: songData.exerciseSections,
    completed: state.completedSections,
    completedExercises: state.completedExercises,
    onChoose: openSection,
    onListen: () => showView('listen-view'),
    onReset: resetProgress,
    onSummary: renderSummary
  });
  showView('training-view');
}

function renderSummary() {
  const root = document.querySelector('#summary-root');
  root.replaceChildren();
  const card = document.createElement('article');
  card.className = 'exercise-card summary-card';
  const total = songData.exerciseSections.reduce((sum, section) => sum + section.exercises.length, 0);
  const progress = summaryProgress(state.completedExercises, total);
  const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = `${progress.completed} ИЗ ${progress.total} ЗАДАНИЙ`;
  const title = document.createElement('h2'); title.textContent = progress.complete ? 'Bravissimo!' : 'Continuiamo!';
  const text = document.createElement('p'); text.className = 'section-intro';
  text.textContent = progress.complete
    ? 'Все задания этой песни пройдены. Можно повторить упражнения или снова послушать песню.'
    : `Пройдено ${progress.completed} из ${progress.total} заданий. Вернитесь к упражнениям и продолжите с любого раздела.`;
  const repeat = document.createElement('button'); repeat.className = 'pill-button'; repeat.textContent = progress.complete ? 'повторить упражнения' : 'вернуться к упражнениям'; repeat.addEventListener('click', openTrainingMenu);
  const listen = document.createElement('button'); listen.className = 'pill-button'; listen.textContent = 'слушать песню'; listen.addEventListener('click', () => showView('listen-view'));
  const actions = document.createElement('div'); actions.className = 'summary-actions'; actions.append(repeat, listen);
  card.append(eyebrow, title, text, actions); root.append(card); showView('summary-view');
}

function openSection(sectionId) {
  const section = songData.exerciseSections.find(item => item.id === sectionId);
  if (!section) return openTrainingMenu();
  state.currentSection = sectionId;
  save();
  renderExerciseStep(section, 0);
  showView('exercise-view');
}

function renderExerciseStep(section, exerciseIndex) {
  renderExercise({
    root: document.querySelector('#exercise-root'),
    section,
    exerciseIndex,
    sections: songData.exerciseSections,
    completedExerciseIds: state.completedExercises,
    onAnswer(id, index, exerciseId) {
      if (!state.completedExercises.includes(exerciseId)) {
        state.completedExercises.push(exerciseId);
      }
      if (index === section.exercises.length - 1 && !state.completedSections.includes(id)) {
        state.completedSections.push(id);
      }
      save();
    },
    onJumpExercise: index => renderExerciseStep(section, index),
    onNextExercise: index => renderExerciseStep(section, index),
    onNextSection: openSection,
    onBack: openTrainingMenu,
    onSummary: renderSummary
  });
}

function resetProgress() {
  if (!confirm('Удалить прогресс для этой песни?')) return;
  store.reset();
  location.reload();
}

document.querySelectorAll('[data-go="training-view"]').forEach(button => button.addEventListener('click', openTrainingMenu));

createYouTubePlayer({
  elementId: 'youtube-player',
  videoId: songData.youtubeId,
  onTime: seconds => lyricsView.setCurrentTime(seconds),
  onUnavailable: () => { fallback.hidden = false; }
}).then(api => { playerApi = api; }).catch(() => { fallback.hidden = false; });

revealButton.textContent = state.revealAll ? 'скрыть перевод' : 'показать перевод';
revealButton.setAttribute('aria-pressed', String(state.revealAll));
autoscrollButton.classList.toggle('is-selected', state.autoScroll);
autoscrollButton.setAttribute('aria-pressed', String(state.autoScroll));
updateProgress();
