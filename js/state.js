export function initialState() {
  return {
    revealAll: false,
    revealedLines: [],
    completedSections: [],
    completedExercises: [],
    currentSection: null,
    autoScroll: false
  };
}

export function createSessionState(savedState) {
  return {
    ...savedState,
    revealAll: false,
    revealedLines: [],
    autoScroll: false
  };
}

export function createStateStore(storage, key) {
  return {
    load() {
      try {
        const parsed = JSON.parse(storage.getItem(key) || '{}');
        const defaults = initialState();
        return Object.fromEntries(Object.keys(defaults).map(field => [field, parsed[field] ?? defaults[field]]));
      } catch {
        return initialState();
      }
    },
    save(state) {
      try {
        storage.setItem(key, JSON.stringify(state));
        return true;
      } catch {
        return false;
      }
    },
    reset() {
      try {
        storage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }
  };
}
