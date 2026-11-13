// Run: node tests/game.test.cjs — no packages required.
const assert = require('node:assert/strict');
const data = require('../songs-data.js');
const Game = require('../game-engine.js');
const regular = 'assets/scott.png', victory = 'assets/scott-victory.png';
const limit = data.questions.length + data.songs.length;
let rounds = 0, maxAccurateQuestions = 0;
let seed = 187;
function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; }
function ids(game) { return game.candidates.map(s => s.id); }
function eligible(game, q, includeCurrent = false) {
  return (includeCurrent || !game.usedQuestions.has(q.id)) &&
    game.candidates.every(s => typeof s.answers[q.id] === 'boolean');
}
function split(game, q) {
  const yes = game.candidates.filter(s => s.answers[q.id] === true).length;
  return [yes, game.candidates.length - yes];
}
function checkTurn(game, seenQ, seenG) {
  assert.equal(game.sprite, regular, 'Regular sprite until confirmed Yes');
  if (game.phase === 'question') {
    const q = game.currentQuestion;
    assert(!seenQ.has(q.id), 'No repeated question'); seenQ.add(q.id);
    assert(eligible(game, q, true), 'Never ask an unverified clue');
    const chosen = split(game, q);
    assert(chosen.every(Boolean), 'Either answer must narrow candidates');
    const rivals = data.questions.filter(q => eligible(game, q, q.id === game.currentQuestion.id))
      .map(q => ({ q, smaller: Math.min(...split(game, q)) })).filter(item => item.smaller > 0);
    const bestSplit = Math.max(...rivals.map(item => item.smaller));
    const allowance = Math.max(1, Math.floor(game.candidates.length / 10));
    assert(Math.min(...chosen) >= bestSplit - allowance, 'Recognition preference stays within balance allowance');
    const finalists = rivals.filter(item => item.smaller >= bestSplit - allowance);
    assert.equal(q.answerability, Math.max(...finalists.map(item => item.q.answerability)), 'Prefer answerability among close splits');
  } else {
    assert(!seenG.has(game.currentGuess.id), 'No repeated guess'); seenG.add(game.currentGuess.id);
  }
}
function checkReset(game) {
  game.reset();
  assert.equal(game.phase, 'start');
  assert.equal(game.sprite, regular);
  assert.deepEqual(ids(game), data.songs.map(s => s.id));
  assert.equal(game.usedQuestions.size, 0);
  assert.equal(game.guessedSongs.size, 0);
  assert.equal(game.currentQuestion, null);
  assert.equal(game.currentGuess, null);
  assert.equal(game.confirmedSong, null);
  assert.equal(game.answersGiven, 0);
  assert.equal(game.canUndo, false);
  assert.equal(game.history.length, 0);
}

// Independent completeness fixtures prevent accidental release/song omissions.
const expectedGroups = {
  'Is This It': 12, 'Room on Fire': 11, 'First Impressions of Earth': 14,
  'Angles': 10, 'Comedown Machine': 11, 'The New Abnormal': 9,
  'Reality Awaits': 9, 'Future Present Past': 3, 'B-sides, bonus tracks & covers': 8
};
assert.equal(data.songs.length, 87);
for (const [group, count] of Object.entries(expectedGroups))
  assert.equal(data.songs.filter(s => s.group === group).length, count, group);
for (const title of ['New York City Cops', 'When It Started', 'Fast Animals', 'Elephant Song',
  "I'll Try Anything Once", "Life's a Gas", 'Clampdown', 'Mercy Mercy Me (The Ecology)',
  'Modern Girls & Old Fashion Men', 'Hawaii', 'Tyrants of the Mellow Moon'])
  assert(data.songs.some(s => s.title === title), title);
assert.equal(new Set(data.songs.map(s => s.id)).size, data.songs.length);
assert(data.songs.every(s => s.source.startsWith('https://')));
assert(data.songs.every(s => s.titleSung === null || s.lyricsSource));
assert.equal(data.songs.find(s => s.id === 'fast-animals').answers.comedown, true);
assert.equal(data.songs.find(s => s.id === 'clampdown').answers.cover, true);
assert.equal(data.songs.find(s => s.id === 'bad-decisions').answers.cover, false);
assert.equal(data.songs.find(s => s.id === 'fear-of-sleep').answers.over4, false);
assert.equal(data.songs.find(s => s.id === 'heart-in-a-cage').answers.titleSung, false);

// Independent listening fixtures, including traps that title/substring matching
// would get wrong. Published evidence is linked in listenerFacts, not inferred
// from song titles. Never manufacture No answers outside the checked recordings.
const listeningExamples = [
  ['hard-to-explain', 'lyricTV', true], ['hard-to-explain', 'differentView', true],
  ['hard-to-explain', 'titleOpening', false], ['last-nite', 'titleOpening', true],
  ['soma', 'titleOpening', true], ['is-this-it', 'titleOpening', false],
  ['not-the-same-anymore', 'titleOpening', false], // Starts with You're.
  ['barely-legal', 'lyricDay', false], // Weekdays isn't a named day.
  ['12-51', 'lyricDay', true], ['the-way-it-is', 'lyricDay', true],
  ['not-the-same-anymore', 'lyricDay', true],
  ['why-are-sundays-so-depressing', 'lyricDay', false], // Title isn't sung.
  ['reptilia', 'lyricWait', true], ['someday', 'lyricWait', false],
  ['ode-to-the-mets', 'drumsPlease', true],
  ['why-are-sundays-so-depressing', 'drumsPlease', false], // Different Fab remark.
  ['brooklyn-bridge-to-chorus', 'newFriends', true], ['selfless', 'lifeShort', true],
  ['barely-legal', 'titleSung', false], ['selfless', 'titleSung', true],
  ['i-cant-win', 'titleSung', true], ['eternal-summer', 'titleSung', false]
];
for (const [id, clue, expected] of listeningExamples)
  assert.equal(data.songs.find(s => s.id === id).answers[clue], expected, id + ' / ' + clue);
assert.equal(Object.keys(data.listenerFacts).length, 32);
assert.equal(data.questions.filter(q => q.category === 'listener').length, 8);
for (const song of data.songs) {
  for (const q of data.questions.filter(q => q.category === 'listener')) {
    if (data.listenerFacts[song.id]) {
      assert.equal(typeof song.answers[q.id], 'boolean');
      assert(data.sources.includes(data.listenerFacts[song.id].source));
    } else assert.equal(song.answers[q.id], null, 'Unchecked song stays unknown');
  }
}

// Small purpose-built catalogs check the selection tradeoff independently of
// whichever songs happen to be in the real catalog.
function selectionFixture(count, definitions) {
  return new Game({
    questions: definitions.map(([id, yes, answerability]) => ({ id, answerability })),
    songs: Array.from({length: count}, (_, i) => ({
      id: String(i), answers: Object.fromEntries(definitions.map(([id, yes]) => [id, i < yes]))
    }))
  });
}
const closeSplit = selectionFixture(10, [['track', 5, 1], ['lyric', 4, 5]]);
closeSplit.start(); assert.equal(closeSplit.currentQuestion.id, 'lyric', '4/6 familiar clue beats 5/5 track trivia');
closeSplit.answer('unknown'); assert.equal(closeSplit.currentQuestion.id, 'track', 'Skipped listener clue falls back without repeating');
const poorSplit = selectionFixture(20, [['track', 10, 1], ['lyric', 7, 5]]);
poorSplit.start(); assert.equal(poorSplit.currentQuestion.id, 'track', '7/13 lies outside the 20-song allowance');
const boundarySplit = selectionFixture(20, [['track', 10, 1], ['lyric', 8, 5]]);
boundarySplit.start(); assert.equal(boundarySplit.currentQuestion.id, 'lyric', '8/12 is within the allowance');
const sameRating = selectionFixture(10, [['worse', 4, 5], ['better', 5, 5], ['tie', 5, 5]]);
sameRating.start(); assert.equal(sameRating.currentQuestion.id, 'better', 'Same rating: balance then catalog order');
const unknownListener = selectionFixture(10, [['track', 5, 1], ['lyric', 5, 5]]);
unknownListener.candidates[0].answers.lyric = null;
unknownListener.start(); assert.equal(unknownListener.currentQuestion.id, 'track', 'High rating never overrides missing evidence');

// Every target: accurate play, all-skipped clues, each individual skipped clue,
// each sole-known clue, and 64 reproducible mixed unknown/accurate schedules.
for (const target of data.songs) {
  const schedules = [
    () => false, () => true,
    ...data.questions.map(q => current => current.id === q.id),
    ...data.questions.map(q => current => current.id !== q.id),
    ...Array.from({length: 64}, (_, i) => {
      const skips = new Set(data.questions.filter(() => random() < (i % 4 + 1) / 5).map(q => q.id));
      return current => skips.has(current.id);
    })
  ];
  schedules.forEach((skip, index) => {
    const game = new Game(data); game.start();
    const seenQ = new Set(), seenG = new Set();
    let turns = 0, guesses = 0;
    while (['question', 'guess'].includes(game.phase)) {
      assert(++turns <= limit, 'Bounded round');
      checkTurn(game, seenQ, seenG);
      const before = ids(game), previousPhase = game.phase, previousGuess = game.currentGuess;
      const progressBefore = game.usedQuestions.size + game.guessedSongs.size;
      let answer;
      if (previousPhase === 'question') {
        const fact = target.answers[game.currentQuestion.id];
        assert.equal(typeof fact, 'boolean');
        answer = skip(game.currentQuestion) ? 'unknown' : fact ? 'yes' : 'no';
      } else {
        guesses++;
        if (index === 0) assert.equal(game.currentGuess.id, target.id, 'Accurate first guess: ' + target.title);
        answer = game.currentGuess.id === target.id ? 'yes' : 'no';
      }
      game.answer(answer);
      if (answer === 'unknown') assert.deepEqual(ids(game), before, 'Skip preserves all candidates');
      else if (previousPhase === 'question') assert(game.candidates.length < before.length, 'Yes/No narrows');
      else if (answer === 'no') assert(!ids(game).includes(previousGuess.id), 'Rejected guess removed');
      if (['question', 'guess'].includes(game.phase))
        assert(game.usedQuestions.size + game.guessedSongs.size > progressBefore, 'Each transition consumes a fresh finite item');
      assert(ids(game).includes(target.id), 'Accurate clues retain target');
    }
    assert.equal(game.phase, 'won', target.title);
    assert.equal(game.confirmedSong.id, target.id);
    assert.equal(game.sprite, victory);
    if (index === 0) {
      assert.equal(guesses, 1);
      maxAccurateQuestions = Math.max(maxAccurateQuestions, seenQ.size);
    }
    checkReset(game); rounds++;
  });
}

// Full catalog: unknown clues, then all unknown guesses, all rejected guesses,
// and 128 seeded mixtures. Every path must terminate and preserve sprite gating.
for (let pattern = 0; pattern < 130; pattern++) {
  const game = new Game(data); game.start();
  const seenQ = new Set(), seenG = new Set(); let turns = 0;
  while (['question', 'guess'].includes(game.phase)) {
    assert(++turns <= limit);
    checkTurn(game, seenQ, seenG);
    const before = ids(game), guess = game.currentGuess;
    const answer = game.phase === 'question' || pattern === 0 || (pattern > 1 && random() < .5) ? 'unknown' : 'no';
    game.answer(answer);
    if (answer === 'unknown') assert.deepEqual(ids(game), before);
    if (guess && answer === 'no') assert(!ids(game).includes(guess.id));
  }
  assert.equal(game.phase, 'stumped');
  assert.equal(game.sprite, regular);
  game.answer('yes'); assert.equal(game.sprite, regular, 'Terminal answers do nothing');
  checkReset(game); rounds++;
}

// Exhaust every unknown/No guess pattern on a small fallback-only catalog.
// This includes a single candidate's unknown and No endings.
for (let count = 1; count <= 6; count++) {
  for (let mask = 0; mask < 2 ** count; mask++) {
    const game = new Game({ songs: data.songs.slice(0, count), questions: [] }); game.start();
    let index = 0;
    while (game.phase === 'guess') {
      assert(index < count);
      game.answer(mask & (1 << index++) ? 'unknown' : 'no');
    }
    assert.equal(index, count);
    assert.equal(game.phase, 'stumped');
    rounds++;
  }
}

// A null fact must never be treated as false or used to eliminate a song.
const partial = new Game({
  questions: [{id: 'unverified'}, {id: 'known'}],
  songs: [
    {id: 'a', answers: {unverified: true, known: true}},
    {id: 'b', answers: {unverified: false, known: false}},
    {id: 'c', answers: {unverified: null, known: false}}
  ]
});
partial.start();
assert.equal(partial.currentQuestion.id, 'known');
partial.answer('unknown');
assert.equal(partial.phase, 'guess');
assert.deepEqual(ids(partial), ['a', 'b', 'c']);
partial.answer('no');
assert.equal(partial.phase, 'guess');
assert.deepEqual(ids(partial), ['b', 'c']);

// Invalid answers leave the current turn intact.
const unchanged = new Game(data); unchanged.start();
const current = unchanged.currentQuestion;
unchanged.answer('maybe');
assert.equal(unchanged.currentQuestion, current);
assert.equal(unchanged.answersGiven, 0);
assert.equal(unchanged.canUndo, false);

// Regression: a mistaken answer removes a song; Undo must recover
// the full turn so correcting that answer can still reach the intended song.
function state(game) {
  return {
    candidates: ids(game), questions: [...game.usedQuestions], guesses: [...game.guessedSongs],
    phase: game.phase, question: game.currentQuestion?.id, guess: game.currentGuess?.id,
    confirmed: game.confirmedSong?.id, count: game.answersGiven, sprite: game.sprite
  };
}
const intended = data.songs.find(s => s.id === 'you-only-live-once');
const recover = new Game(data); recover.start();
const beforeMistake = state(recover);
recover.answer(intended.answers[recover.currentQuestion.id] ? 'no' : 'yes');
assert(!ids(recover).includes(intended.id));
recover.undo();
assert.deepEqual(state(recover), beforeMistake);
while (recover.phase === 'question') recover.answer(intended.answers[recover.currentQuestion.id] ? 'yes' : 'no');
assert.equal(recover.currentGuess.id, intended.id);

// Undo each possible guess answer, including undoing victory and a terminal No.
for (const answer of ['no', 'unknown', 'yes']) {
  const beforeGuess = state(recover);
  recover.answer(answer);
  if (answer === 'yes') assert.equal(recover.sprite, victory);
  recover.undo();
  assert.deepEqual(state(recover), beforeGuess);
  assert.equal(recover.sprite, regular);
}

// Multiple undo steps restore all state, including skipped questions, in order.
const rewind = new Game(data); rewind.start(); const states = [];
for (let i = 0; i < 3; i++) { states.push(state(rewind)); rewind.answer('unknown'); }
while (states.length) { rewind.undo(); assert.deepEqual(state(rewind), states.pop()); }
assert.equal(rewind.canUndo, false);
const firstTurn = state(rewind); rewind.undo(); assert.deepEqual(state(rewind), firstTurn);
checkReset(rewind);
console.log('PASS: ' + rounds.toLocaleString() + ' complete rounds; all 87 songs get a correct first guess with accurate answers (at most ' + maxAccurateQuestions + ' clues). Unknowns, rejection, answerability/balance selection, listener fixtures, verification guards, no repeats, victory gating and reset passed.');
