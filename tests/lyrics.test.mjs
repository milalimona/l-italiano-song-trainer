import test from 'node:test';
import assert from 'node:assert/strict';
import { activeLineAtPlaybackTime, shouldHoldSelectedLine } from '../js/lyrics.js';

test('подсветка учитывает откалиброванное смещение записи', () => {
  const lines = [
    { id: 'a', start: 10, end: 12 },
    { id: 'b', start: 12, end: 14 }
  ];
  assert.equal(activeLineAtPlaybackTime(lines, 12.89, 0.9), 'a');
  assert.equal(activeLineAtPlaybackTime(lines, 12.9, 0.9), 'b');
});

test('выбранная кликом строка остаётся активной до начала следующей', () => {
  const selected = { id: 'b', start: 12, end: 14 };
  assert.equal(shouldHoldSelectedLine(selected, 11.6), true);
  assert.equal(shouldHoldSelectedLine(selected, 14.89, 0.9), true);
  assert.equal(shouldHoldSelectedLine(selected, 14.9, 0.9), false);
});
