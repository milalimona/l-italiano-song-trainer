import test from 'node:test';
import assert from 'node:assert/strict';
import { activeLineAtPlaybackTime } from '../js/lyrics.js';

test('подсветка ждёт окончания предыдущей строки', () => {
  const lines = [
    { id: 'a', start: 10, end: 12 },
    { id: 'b', start: 12, end: 14 }
  ];
  assert.equal(activeLineAtPlaybackTime(lines, 12.89), 'a');
  assert.equal(activeLineAtPlaybackTime(lines, 12.9), 'b');
});
