import test from 'node:test';
import assert from 'node:assert/strict';
import { activeLineAtPlaybackTime, shouldHoldSelectedLine } from '../js/lyrics.js';

test('подсветка меняется точно в начале следующей фразы', () => {
  const lines = [
    { id: 'a', start: 10, end: 12 },
    { id: 'b', start: 12, end: 14 }
  ];
  assert.equal(activeLineAtPlaybackTime(lines, 11.99), 'a');
  assert.equal(activeLineAtPlaybackTime(lines, 12), 'b');
});

test('выбранная кликом строка остаётся активной до начала следующей', () => {
  const selected = { id: 'b', start: 12, end: 14 };
  assert.equal(shouldHoldSelectedLine(selected, 11.6), true);
  assert.equal(shouldHoldSelectedLine(selected, 13.99), true);
  assert.equal(shouldHoldSelectedLine(selected, 14), false);
});
