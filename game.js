/* Page behavior. Edit songs-data.js to change the setlist or clues. */
(function () {
  'use strict';
  const data = globalThis.SCOTTINATOR_DATA;
  const game = new globalThis.ScottinatorGame(data);
  const byId = id => document.getElementById(id);
  const prompt = byId('prompt');
  const hint = byId('hint');
  const kicker = byId('speech-kicker');
  const sprite = byId('scott');

  // The catalog is informational only: it never sends a choice to the engine.
  const albums = [...new Set(data.songs.map(song => song.group))];
  const catalogGroups = [];
  albums.forEach(album => {
    const songs = data.songs.filter(song => song.group === album);
    const group = document.createElement('section');
    const heading = document.createElement('h3');
    heading.className = 'album-heading';
    const years = songs.map(song => song.year);
    const firstYear = Math.min(...years), lastYear = Math.max(...years);
    heading.textContent = `${album} · ${firstYear === lastYear ? firstYear : `${firstYear}–${lastYear}`}`;
    const list = document.createElement('ul');
    list.className = 'album-songs';
    const entries = [];
    songs.forEach(song => {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'track-number';
      number.textContent = song.id === 'fast-animals' ? 'Bonus 12' : song.track === null ? '—' : String(song.track).padStart(2, '0');
      item.append(number, document.createTextNode(song.title));
      list.append(item);
      entries.push({ item, searchText: `${song.title} ${song.group} ${song.release}`.toLocaleLowerCase() });
    });
    group.append(heading, list);
    byId('song-list').append(group);
    catalogGroups.push({ group, entries });
  });
  byId('catalog-total').textContent = `${data.songs.length} TRACKS`;
  byId('edition-count').textContent = `VOL. 02 / ${data.songs.length} TRACKS`;
  byId('start-note').textContent = `${data.songs.length} songs. Three answers. One mind reader.`;
  function filterCatalog() {
    const query = byId('catalog-search').value.trim().toLocaleLowerCase().replace(/[’‘]/g, "'");
    let visible = 0;
    catalogGroups.forEach(({ group, entries }) => {
      let matches = 0;
      entries.forEach(({ item, searchText }) => {
        item.hidden = !searchText.replace(/[’‘]/g, "'").includes(query);
        if (!item.hidden) matches++;
      });
      group.hidden = matches === 0;
      visible += matches;
    });
    byId('catalog-total').textContent = query ? `${visible} OF ${data.songs.length}` : `${data.songs.length} TRACKS`;
    byId('catalog-empty').hidden = visible !== 0;
  }
  byId('catalog-search').addEventListener('input', filterCatalog);
  const preload = new Image();
  preload.src = 'assets/scott-victory.png';

  function render(moveFocus = true) {
    const playing = ['question', 'guess'].includes(game.phase);
    byId('start-controls').hidden = game.phase !== 'start';
    byId('answer-controls').hidden = !playing;
    byId('end-controls').hidden = !['won', 'stumped'].includes(game.phase);
    byId('reset').hidden = !playing;
    byId('undo').hidden = !game.canUndo;
    byId('song-meta').hidden = game.phase !== 'won';
    sprite.setAttribute('src', game.sprite);
    sprite.alt = game.phase === 'won' ? 'Scott celebrating your confirmed song' : 'Scott, ready to guess your song';
    document.querySelector('.booth').classList.toggle('is-won', game.phase === 'won');
    if (game.phase === 'question') {
      byId('answer-note').textContent = 'Not sure? “I don’t know” skips the question and keeps every remaining song. Use “Undo answer” to correct an earlier answer.';
      kicker.textContent = 'LET ME GET A READ ON THIS.';
      prompt.textContent = game.currentQuestion.text;
      hint.textContent = game.currentQuestion.hint;
      byId('round-label').textContent = `SIDE A · QUESTION ${game.usedQuestions.size.toString().padStart(2, '0')}`;
    } else if (game.phase === 'guess') {
      byId('answer-note').textContent = 'If this is your song, choose Yes. “I don’t know” skips this guess; “Undo answer” lets you return to it.';
      kicker.textContent = 'I THINK I’VE GOT IT.';
      prompt.textContent = `Is your song ${game.currentGuess.title}?`;
      hint.textContent = 'Yes seals it. No rules this song out. Not sure? I’ll try another unguessed song.';
      byId('round-label').textContent = 'SIDE B · THE GUESS';
    } else if (game.phase === 'won') {
      kicker.textContent = 'THAT’S THE ONE!';
      prompt.textContent = 'Nailed it. Take a bow.';
      hint.textContent = 'Great pick. I knew we were on the same wavelength.';
      byId('song-meta').textContent = `${game.confirmedSong.title} — ${game.confirmedSong.album || game.confirmedSong.release} (${game.confirmedSong.year})`;
      byId('round-label').textContent = 'SIDE B · ENCORE';
    } else if (game.phase === 'stumped') {
      kicker.textContent = 'CREDIT WHERE IT’S DUE.';
      prompt.textContent = 'You stumped me.';
      hint.textContent = 'I’m out of guesses for this round. Pick a song from the setlist and give me another shot.';
      byId('round-label').textContent = 'SIDE B · CURTAIN CALL';
    } else {
      kicker.textContent = 'HEY, I’M SCOTT.';
      prompt.replaceChildren(document.createTextNode('You think of a song.'), document.createElement('br'), document.createTextNode('I’ll read the room.'));
      hint.textContent = 'Pick a song by The Strokes from the list below. Keep it to yourself. I’ll ask the questions.';
      byId('round-label').textContent = 'SIDE A · THE SETUP';
    }
    byId('status').textContent = playing
      ? `${game.candidates.length} POSSIBLE ${game.candidates.length === 1 ? 'TRACK' : 'TRACKS'} · ${game.answersGiven} ANSWERS`
      : game.phase === 'won' ? 'ONE SONG. ONE GOOD GUESS.' : game.phase === 'stumped' ? 'THE NEXT ROUND IS YOURS' : 'READY WHEN YOU ARE';
    if (moveFocus) prompt.focus({ preventScroll: true });
  }
  byId('start').addEventListener('click', () => { byId('catalog').open = false; game.start(); render(); });
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => { game.answer(button.dataset.answer); render(); }));
  byId('undo').addEventListener('click', () => { game.undo(); render(); });
  [byId('reset'), byId('again')].forEach(button => button.addEventListener('click', () => {
    game.reset();
    byId('catalog').open = false;
    byId('catalog-search').value = '';
    filterCatalog();
    render();
  }));
  render(false);
})();
