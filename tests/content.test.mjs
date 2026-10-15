import test from 'node:test';
import assert from 'node:assert/strict';
import { songData } from '../js/song-data.js';

test('содержит весь текст с переводом и точными последовательными таймингами', () => {
  const lines = songData.sections.flatMap(section => section.lines);
  assert.equal(lines.length, 52);
  assert.equal(lines[0].it, 'Lasciatemi cantare');
  assert.equal(lines.at(-1).it, 'un italiano vero');
  assert.ok(lines.every(line => line.it && line.ru && line.end > line.start));
  assert.equal(new Set(lines.map(line => line.id)).size, 52);
  assert.ok(lines.every((line, index) => index === 0 || line.start >= lines[index - 1].start));
  assert.equal(songData.playbackSyncOffset, 0.9);
});

test('содержит восемь разделов и 64 разнообразных упражнения', () => {
  const counts = songData.exerciseSections.map(section => section.exercises.length);
  assert.deepEqual(counts, [8, 10, 8, 8, 8, 6, 6, 10]);
  const exercises = songData.exerciseSections.flatMap(section => section.exercises);
  assert.equal(exercises.length, 64);
  assert.ok(exercises.filter(item => item.type === 'choice').every(item => item.options.length === 4));
  assert.ok(exercises.filter(item => item.type === 'choice').every(item => item.options.includes(item.answer)));
  assert.ok(new Set(exercises.map(item => item.type)).size >= 2);
});

test('история остаётся двуязычной и содержательной', () => {
  assert.ok(songData.history.sentences.length >= 10);
  assert.ok(songData.history.sentences.every(item => item.it && item.ru));
});
