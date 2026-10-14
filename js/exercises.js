function normalize(value) {
  const source = Array.isArray(value) ? value.join(' ') : value;
  return String(source).trim().toLocaleLowerCase('it').replace(/\s+/g, ' ');
}

export function checkAnswer(exercise, answer) {
  return {
    correct: normalize(answer) === normalize(exercise.answer),
    explanation: exercise.explanation
  };
}

export function formatCorrectFeedback(exercise) {
  if (exercise.type === 'order' && exercise.solution) {
    return `Верно.\n${exercise.solution.it} — ${exercise.solution.ru}`;
  }
  const completedPhrase = exercise.solution
    ? `\n${exercise.solution.it} — ${exercise.solution.ru}`
    : '';
  return `Верно. ${exercise.explanation}${completedPhrase}`;
}

export function formatWrongFeedback(exercise) {
  if (exercise.type === 'order') return 'Попробуйте ещё.';
  return exercise.wrongHint
    ? `Попробуйте ещё. ${exercise.wrongHint}`
    : `Попробуйте ещё. Вспомните строку: «${exercise.context}»`;
}

export function toggleOrderedSelection(selectedIds, optionId) {
  return selectedIds.includes(optionId)
    ? selectedIds.filter(id => id !== optionId)
    : [...selectedIds, optionId];
}

export function summaryProgress(completedExercises, total) {
  const completed = new Set(completedExercises).size;
  return { completed, total, complete: completed === total };
}

export function completionPercent(completed, total) {
  return total ? Math.round((new Set(completed).size / total) * 100) : 0;
}

export function sectionCompletion(answeredIndexes, exerciseCount) {
  return exerciseCount ? Math.round((new Set(answeredIndexes).size / exerciseCount) * 100) : 0;
}

export function exerciseNumberStates(exercises, currentIndex, completedExerciseIds = []) {
  const completed = new Set(completedExerciseIds);
  return exercises.map((exercise, index) => ({
    id: exercise.id,
    number: index + 1,
    active: index === currentIndex,
    complete: completed.has(exercise.id)
  }));
}

export function nextSection(sections, currentId) {
  const index = sections.findIndex(section => section.id === currentId);
  return index >= 0 ? sections[index + 1] ?? null : null;
}

export function exerciseNavigation(sections, section, exerciseIndex) {
  if (exerciseIndex < section.exercises.length - 1) {
    return { label: 'СЛЕДУЮЩЕЕ ЗАДАНИЕ', type: 'exercise', nextIndex: exerciseIndex + 1 };
  }
  const next = nextSection(sections, section.id);
  return next
    ? { label: next.title.toUpperCase(), type: 'section', sectionId: next.id }
    : { label: 'РЕЗУЛЬТАТ', type: 'summary' };
}

export function shuffleOptions(options, random = Math.random) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function renderTrainingMenu({ root, sections, completed, completedExercises = [], onChoose, onListen, onReset, onSummary }) {
  root.replaceChildren();
  const header = node('div', 'section-heading');
  header.append(node('p', 'eyebrow', 'ВЫБЕРИТЕ РАЗДЕЛ'), node('h2', '', 'Упражнения'));
  const totalExercises = sections.reduce((sum, section) => sum + section.exercises.length, 0);
  const percent = completionPercent(completedExercises, totalExercises);
  header.append(node('p', 'section-intro', 'Выберите раздел для тренировки.'));
  const stats = node('div', 'training-stats');
  const statItems = [
    [String(totalExercises), 'ЗАДАНИЙ'],
    [String(new Set(completedExercises).size), 'ПРОЙДЕНО'],
    [String(sections.length), 'РАЗДЕЛОВ']
  ];
  statItems.forEach(([value, label]) => {
    const item = node('div', 'training-stat');
    item.append(node('strong', '', value), node('span', '', label));
    stats.append(item);
  });
  const hero = node('div', 'training-hero');
  hero.append(header, stats);
  root.append(hero);
  const progress = node('div', 'section-progress');
  const progressFill = node('span');
  progressFill.style.width = `${Math.max(2, percent)}%`;
  progress.append(progressFill);
  root.append(progress);

  const grid = node('div', 'training-grid');
  for (const section of sections) {
    const card = node('button', `training-card${completed.includes(section.id) ? ' is-complete' : ''}`);
    card.type = 'button';
    card.append(
      node('span', 'route-number', String(section.recommended).padStart(2, '0')),
      node('strong', '', section.title),
      node('small', '', section.subtitle),
      node('span', 'completion-mark', completed.includes(section.id) ? 'готово ✓' : 'открыть →')
    );
    card.addEventListener('click', () => onChoose(section.id));
    grid.append(card);
  }
  root.append(grid);
  const footer = node('div', 'menu-actions');
  const back = node('button', 'pill-button', '← к песне');
  back.type = 'button'; back.addEventListener('click', onListen);
  const reset = node('button', 'pill-button', 'начать заново');
  reset.type = 'button'; reset.addEventListener('click', onReset);
  footer.append(back, reset);
  if (percent === 100) {
    const summary = node('button', 'pill-button', 'посмотреть итог →');
    summary.type = 'button';
    summary.addEventListener('click', onSummary);
    footer.append(summary);
  }
  root.append(footer);
}

export function renderExercise({ root, section, exerciseIndex, sections, completedExerciseIds = [], onAnswer, onJumpExercise, onNextExercise, onNextSection, onBack, onSummary }) {
  root.replaceChildren();
  const exercise = section.exercises[exerciseIndex];
  const wrap = node('div', 'exercise-card');
  const head = node('div', 'exercise-head');
  head.append(node('p', 'eyebrow', section.title.toUpperCase()), node('span', 'exercise-count', `${exerciseIndex + 1} / ${section.exercises.length}`));
  const numberNav = node('nav', 'exercise-number-nav');
  numberNav.setAttribute('aria-label', 'Задания раздела');
  for (const item of exerciseNumberStates(section.exercises, exerciseIndex, completedExerciseIds)) {
    const numberButton = node('button', `exercise-number${item.active ? ' is-active' : ''}${item.complete ? ' is-complete' : ''}`, String(item.number));
    numberButton.type = 'button';
    numberButton.setAttribute('aria-label', `Задание ${item.number}`);
    if (item.active) numberButton.setAttribute('aria-current', 'step');
    numberButton.addEventListener('click', () => onJumpExercise(item.number - 1));
    numberNav.append(numberButton);
  }
  wrap.append(head, numberNav, node('h2', '', exercise.prompt));
  const options = node('div', 'answer-options');
  const feedback = node('div', 'feedback');
  feedback.setAttribute('aria-live', 'polite');
  let selectedTokenIds = [];
  const orderedTokens = new Map();

  const completeAnswer = answer => {
    const result = checkAnswer(exercise, answer);
    feedback.textContent = result.correct
      ? formatCorrectFeedback(exercise)
      : formatWrongFeedback(exercise);
    if (!result.correct) return false;
    options.querySelectorAll('button').forEach(item => { item.disabled = true; });
    onAnswer(section.id, exerciseIndex, exercise.id);
    return true;
  };

  for (const [optionIndex, option] of shuffleOptions(exercise.options).entries()) {
    const button = node('button', 'answer-button', option);
    button.type = 'button';
    const tokenId = `${exercise.id}-token-${optionIndex}`;
    button.dataset.tokenId = tokenId;
    orderedTokens.set(tokenId, option);
    button.addEventListener('click', () => {
      if (exercise.type === 'order') {
        selectedTokenIds = toggleOrderedSelection(selectedTokenIds, tokenId);
        button.classList.toggle('is-selected-word', selectedTokenIds.includes(tokenId));
        const selectedWords = selectedTokenIds.map(id => orderedTokens.get(id));
        feedback.textContent = selectedWords.join(' ');
        if (selectedWords.length === exercise.options.length) completeAnswer(selectedWords);
        return;
      }
      options.querySelectorAll('button').forEach(item => item.classList.remove('is-correct', 'is-wrong'));
      const correct = completeAnswer(option);
      button.classList.add(correct ? 'is-correct' : 'is-wrong');
    });
    options.append(button);
  }
  wrap.append(options, feedback);
  const navigation = exerciseNavigation(sections, section, exerciseIndex);
  const next = nextSection(sections, section.id);
  const actions = node('div', 'exercise-actions');
  const action = node('button', `exercise-next${navigation.type === 'section' ? ' exercise-next--section' : ''}`, navigation.label);
  action.type = 'button';
  if (navigation.type === 'section') action.dataset.label = navigation.label;
  action.addEventListener('click', () => {
    if (navigation.type === 'exercise') onNextExercise(navigation.nextIndex);
    else if (navigation.type === 'section') onNextSection(navigation.sectionId);
    else onSummary();
  });
  const back = node('button', 'pill-button exercise-back', '← ко всем разделам');
  back.type = 'button'; back.addEventListener('click', onBack);
  actions.append(back, action);
  if (next && navigation.type === 'exercise') {
    const sectionJump = node('button', 'section-jump');
    sectionJump.type = 'button';
    sectionJump.append(node('span', '', 'СЛЕДУЮЩИЙ РАЗДЕЛ'), node('strong', '', next.title.toUpperCase()), node('b', '', '→'));
    sectionJump.addEventListener('click', () => onNextSection(next.id));
    actions.append(sectionJump);
  }
  wrap.append(actions);
  root.append(wrap);
}
