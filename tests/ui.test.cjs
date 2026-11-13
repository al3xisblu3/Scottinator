// Page integration checks without installing a browser or third-party packages.
// This fixture tests DOM behavior, not browser layout or CSS rendering.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const data = require('../songs-data.js');
const Game = require('../game-engine.js');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = ['songs-data.js', 'game-engine.js', 'game.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8'));

class Element {
  constructor(tag = 'div') {
    this.tag = tag; this.children = []; this.hidden = false; this.open = false;
    this.value = ''; this.dataset = {}; this.attributes = {}; this.events = {};
    this.classes = new Set(); this._text = '';
    this.classList = { toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) };
  }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
  set textContent(text) { this._text = text; this.children = []; }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this._text = ''; this.children = children; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, callback) { this.events[name] = callback; }
  focus() { this.focused = true; }
  click() { assert(this.events.click, 'Clickable control'); this.events.click(); }
}

function page() {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Unique HTML IDs');
  const nodes = Object.fromEntries(ids.map(id => [id, new Element()]));
  const answers = [...html.matchAll(/data-answer="([^"]+)"/g)].map(match => {
    const button = new Element('button'); button.dataset.answer = match[1]; return button;
  });
  assert.deepEqual(answers.map(button => button.dataset.answer), ['yes', 'no', 'unknown']);
  const booth = new Element();
  const document = {
    getElementById: id => { assert(nodes[id], 'ID exists in actual HTML: ' + id); return nodes[id]; },
    querySelector: selector => { assert.equal(selector, '.booth'); return booth; },
    querySelectorAll: selector => { assert.equal(selector, '[data-answer]'); return answers; },
    createElement: tag => new Element(tag),
    createTextNode: text => { const node = new Element('#text'); node.textContent = text; return node; }
  };
  const context = vm.createContext({ document, Image: class {} });
  scripts.forEach(source => vm.runInContext(source, context));
  return { nodes, answers: Object.fromEntries(answers.map(button => [button.dataset.answer, button])), booth };
}
function regular(nodes) { assert.equal(nodes.scott.attributes.src, 'assets/scott.png'); }
function setup(nodes) {
  regular(nodes);
  assert.equal(nodes['start-controls'].hidden, false);
  assert.equal(nodes['answer-controls'].hidden, true);
  assert.equal(nodes['end-controls'].hidden, true);
  assert.equal(nodes['catalog-search'].value, '');
  assert.equal(nodes['catalog-total'].textContent, '87 TRACKS');
  assert.equal(nodes.undo.hidden, true);
}

for (const target of data.songs) {
  const { nodes, answers, booth } = page();
  setup(nodes);
  assert.equal(nodes['edition-count'].textContent, 'VOL. 02 / 87 TRACKS');
  assert.equal(nodes['start-note'].textContent, '87 songs. Three answers. One mind reader.');
  assert.equal(nodes['song-list'].children.length, 9);
  assert.equal(nodes['song-list'].children.reduce((sum, group) => sum + group.children[1].children.length, 0), 87);
  const rendered = nodes['song-list'].children.flatMap(group => group.children[1].children);
  const expectedLabels = {
    'you-only-live-once': '01', 'reptilia': '02', 'tap-out': '01',
    'when-it-started': '09', 'new-york-city-cops': '09', 'drag-queen': '01',
    'threat-of-joy': '03', 'fast-animals': 'Bonus 12', 'hawaii': '—'
  };
  for (const [id, label] of Object.entries(expectedLabels))
    assert.equal(rendered[data.songs.findIndex(song => song.id === id)].children[0].textContent, label, 'Actual release position: ' + id);

  const game = new Game(data); game.start(); nodes.start.click();
  let turns = 0;
  while (game.phase === 'question') {
    assert(++turns <= data.questions.length);
    regular(nodes);
    assert.equal(nodes['answer-controls'].hidden, false);
    assert.equal(nodes.prompt.textContent, game.currentQuestion.text);
    const answer = target.answers[game.currentQuestion.id] ? 'yes' : 'no';
    answers[answer].click(); game.answer(answer);
  }
  assert.equal(nodes.prompt.textContent, 'Is your song ' + target.title + '?');
  regular(nodes);
  answers.yes.click();
  assert.equal(nodes.scott.attributes.src, 'assets/scott-victory.png');
  assert(booth.classes.has('is-won'));
  assert.equal(nodes['answer-controls'].hidden, true);
  assert.equal(nodes['end-controls'].hidden, false);
  assert(nodes['song-meta'].textContent.includes(target.album || target.release));
  assert(!nodes['song-meta'].textContent.includes('null'));
  assert.equal(nodes.undo.hidden, false);
  nodes.undo.click();
  regular(nodes);
  assert(!booth.classes.has('is-won'));
  assert.equal(nodes.prompt.textContent, 'Is your song ' + target.title + '?');
  assert.equal(nodes['answer-controls'].hidden, false);
  assert.equal(nodes['end-controls'].hidden, true);
  assert(nodes['answer-note'].textContent.includes('skips this guess'));
  answers.yes.click();
  nodes.again.click(); setup(nodes);
  assert(!booth.classes.has('is-won'));
}

// Searching after Start must leave the current question, status and candidates intact.
const { nodes, answers } = page(); nodes.start.click();
const promptBefore = nodes.prompt.textContent, statusBefore = nodes.status.textContent;
nodes['catalog-search'].value = 'Hawaii'; nodes['catalog-search'].events.input();
assert.equal(nodes['catalog-total'].textContent, '1 OF 87');
assert.equal(nodes.prompt.textContent, promptBefore);
assert.equal(nodes.status.textContent, statusBefore);
answers.unknown.click();
assert.equal(nodes.undo.hidden, false);
nodes.undo.click();
assert.equal(nodes.prompt.textContent, promptBefore);
assert.equal(nodes.status.textContent, statusBefore);
assert.equal(nodes.undo.hidden, true);
nodes['catalog-search'].value = 'nothing-matches-this'; nodes['catalog-search'].events.input();
assert.equal(nodes['catalog-empty'].hidden, false);
assert.equal(nodes['catalog-total'].textContent, '0 OF 87');
nodes.reset.click(); setup(nodes);
nodes.start.click();
const reference = new Game(data); reference.start();
let turns = 0;
while (['question', 'guess'].includes(reference.phase)) {
  assert(++turns <= data.questions.length + data.songs.length);
  regular(nodes);
  answers.unknown.click(); reference.answer('unknown');
}
assert.equal(nodes.prompt.textContent, 'You stumped me.');
assert.equal(nodes['end-controls'].hidden, false); regular(nodes);
assert.equal(nodes.undo.hidden, false);
nodes.undo.click();
assert.equal(nodes['answer-controls'].hidden, false);
assert.equal(nodes['end-controls'].hidden, true);
answers.unknown.click();
assert.equal(nodes.prompt.textContent, 'You stumped me.');
nodes.again.click(); setup(nodes);
console.log('PASS: page integration for all 87 songs; dynamic counts, catalog search privacy, three answers, reveals, sprites, unknown ending and restart.');
