export function flattenLines(sections) {
  return sections.flatMap(section => section.lines);
}

export function findActiveLine(lines, seconds, lead = 0) {
  const adjustedSeconds = seconds + lead;
  return lines.find(line => adjustedSeconds >= line.start && adjustedSeconds < line.end)?.id ?? null;
}

export function activeLineAtPlaybackTime(lines, seconds) {
  return findActiveLine(lines, seconds);
}

export function shouldHoldSelectedLine(line, seconds) {
  return Boolean(line && seconds < line.end);
}

export function toggleRevealedLine(state, lineId) {
  const revealedLines = state.revealedLines.includes(lineId)
    ? state.revealedLines.filter(id => id !== lineId)
    : [...state.revealedLines, lineId];
  return { ...state, revealedLines };
}

export function shouldAutoScroll({ autoScroll, activeId, previousId }) {
  return Boolean(autoScroll && activeId && activeId !== previousId);
}

export function shouldActivateLine(selectionText) {
  return !String(selectionText).trim();
}

export function setAllTranslations(state, reveal) {
  return { ...state, revealAll: reveal, revealedLines: reveal ? state.revealedLines : [] };
}

export function autoScrollOptions() {
  return { block: 'nearest', behavior: 'smooth' };
}

export function calculateAutoScrollTop({ currentScrollTop, lineTop, anchorBottom, offset = 48 }) {
  return Math.max(0, currentScrollTop + lineTop - anchorBottom - offset);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createLyricsView({ root, sections, state, onSeek, onStateChange, scrollContainer, anchorElement }) {
  const lines = flattenLines(sections);
  let activeId = null;
  let selectedLine = null;
  let awaitingSelectedSeek = false;
  let currentState = state;

  function persist() {
    onStateChange({ ...currentState });
  }

  function handleClick(event) {
    const target = event.target.closest('.lyric-line');
    if (!target || !root.contains(target)) return;
    if (!shouldActivateLine(globalThis.getSelection?.().toString() ?? '')) return;
    const line = lines.find(item => item.id === target.dataset.lineId);
    if (!line) return;
    if (target.classList.contains('lyric-line--italian')) {
      selectedLine = line;
      awaitingSelectedSeek = true;
      activeId = line.id;
      highlight(activeId, false);
      onSeek(line.start, line.end);
      return;
    }
    const willReveal = !target.classList.contains('is-revealed');
    currentState = toggleRevealedLine(currentState, line.id);
    target.classList.toggle('is-revealed', willReveal);
    target.setAttribute('aria-label', willReveal ? 'Скрыть перевод строки' : 'Показать перевод строки');
    persist();
  }

  function makeInteractive(node) {
    node.setAttribute('role', 'button');
    node.tabIndex = 0;
    node.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      node.click();
    });
    return node;
  }

  function render() {
    root.replaceChildren();
    const grid = el('div', 'lyrics-grid');
    for (const section of sections) {
      const verse = el('div', 'verse-pair');
      verse.dataset.section = section.id;
      for (const line of section.lines) {
        const row = el('div', 'line-pair');
        const italian = makeInteractive(el('span', 'lyric-line lyric-line--italian', line.it));
        italian.dataset.lineId = line.id;
        italian.title = 'Перейти к этой строке';

        const revealed = currentState.revealAll || currentState.revealedLines.includes(line.id);
        const translation = makeInteractive(el('span', `lyric-line lyric-line--translation${revealed ? ' is-revealed' : ''}`, line.ru));
        translation.dataset.lineId = line.id;
        translation.setAttribute('aria-label', revealed ? 'Скрыть перевод строки' : 'Показать перевод строки');
        translation.addEventListener('click', event => {
          event.stopPropagation();
          if (!shouldActivateLine(globalThis.getSelection?.().toString() ?? '')) return;
          const willReveal = !translation.classList.contains('is-revealed');
          currentState = toggleRevealedLine(currentState, line.id);
          translation.classList.toggle('is-revealed', willReveal);
          translation.setAttribute('aria-label', willReveal ? 'Скрыть перевод строки' : 'Показать перевод строки');
          persist();
        });
        row.append(italian, translation);
        verse.append(row);
      }
      grid.append(verse);
    }
    root.append(grid);
    if (activeId) highlight(activeId, false);
  }

  function highlight(lineId, shouldScroll) {
    root.querySelectorAll('.is-current').forEach(node => node.classList.remove('is-current'));
    if (!lineId) return;
    root.querySelectorAll(`[data-line-id="${lineId}"]`).forEach(node => node.classList.add('is-current'));
    if (shouldScroll && currentState.autoScroll) {
      const activeLine = root.querySelector(`.lyric-line--italian[data-line-id="${lineId}"]`);
      if (activeLine && scrollContainer && anchorElement) {
        scrollContainer.scrollTo({
          top: calculateAutoScrollTop({
            currentScrollTop: scrollContainer.scrollTop,
            lineTop: activeLine.getBoundingClientRect().top,
            anchorBottom: anchorElement.getBoundingClientRect().bottom
          }),
          behavior: autoScrollOptions().behavior
        });
      }
    }
  }

  root.addEventListener('click', handleClick);
  render();
  return {
    render,
    setState(nextState) {
      currentState = nextState;
      render();
    },
    setCurrentTime(seconds) {
      if (selectedLine) {
        if (awaitingSelectedSeek) {
          if (seconds <= selectedLine.end) awaitingSelectedSeek = false;
          else return;
        }
        if (shouldHoldSelectedLine(selectedLine, seconds)) return;
        selectedLine = null;
      }
      const nextId = activeLineAtPlaybackTime(lines, seconds);
      if (nextId !== activeId) {
        const scroll = shouldAutoScroll({ autoScroll: currentState.autoScroll, activeId: nextId, previousId: activeId });
        activeId = nextId;
        highlight(activeId, scroll);
      }
    },
    destroy() {
      root.removeEventListener('click', handleClick);
      root.replaceChildren();
    }
  };
}
