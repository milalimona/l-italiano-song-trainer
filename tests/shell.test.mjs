import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);

test('identifies the L’italiano trainer and official video', async () => {
  const { songData } = await import('../js/song-data.js');
  assert.equal(songData.id, 'l-italiano');
  assert.equal(songData.title, 'L’italiano');
  assert.equal(songData.artist, 'Toto Cutugno');
  assert.equal(songData.youtubeId, 'TYtdYslLY9I');
});

test('renders the approved visual shell without previous-song branding', () => {
  const html = readFileSync(new URL('index.html', root), 'utf8');
  assert.match(html, /TOTO CUTUGNO/);
  assert.match(html, /L’ITALIANO/);
  assert.match(html, /ITALIANO/);
  assert.match(html, /RUSSO/);
  assert.doesNotMatch(html, /FELICITÀ|AL BANO|ROMINA POWER|SARÀ PERCHÉ TI AMO|RICCHI E POVERI/);
});

test('contains a source-grounded A1–A2 history', async () => {
  const { songData } = await import('../js/song-data.js');
  const history = songData.history.sentences.map(item => item.it).join(' ');
  assert.match(history, /1983/);
  assert.match(history, /Sanremo/);
  assert.match(history, /Adriano Celentano/);
  assert.ok(songData.history.sentences.length >= 8);
  assert.ok(songData.history.sentences.every(item => item.it && item.ru));
  assert.ok(songData.history.sources.length >= 3);
});
