/* Pure game rules: no DOM or browser dependencies. Also usable by Node tests. */
(function (root) {
  'use strict';
  class ScottinatorGame {
    constructor(data) { this.data = data; this.reset(); }
    reset() {
      this.candidates = [...this.data.songs];
      this.usedQuestions = new Set();
      this.guessedSongs = new Set();
      this.phase = 'start';
      this.currentQuestion = null;
      this.currentGuess = null;
      this.confirmedSong = null;
      this.answersGiven = 0;
      this.history = [];
    }
    start() { this.reset(); this.advance(); }
    get canUndo() { return this.history.length > 0; }
    undo() {
      const previous = this.history.pop();
      if (!previous) return;
      Object.assign(this, previous);
    }
    bestQuestion() {
      const useful = [];
      for (const question of this.data.questions) {
        if (this.usedQuestions.has(question.id)) continue;
        // Ask only when all remaining candidates have verified Yes/No answers.
        // An unsourced fact must never silently become No.
        if (this.candidates.some(song => typeof song.answers[question.id] !== 'boolean')) continue;
        const yesCount = this.candidates.filter(song => song.answers[question.id]).length;
        const noCount = this.candidates.length - yesCount;
        // A useful question must remove at least one song on EITHER answer.
        if (!yesCount || !noCount) continue;
        useful.push({ question, smallerSide: Math.min(yesCount, noCount) });
      }
      if (!useful.length) return null;
      // Keep splits close to the best available: allow one song, or 10% of
      // remaining candidates, fewer on the smaller side. Within that window,
      // prefer answerable clues over track-list trivia. These ratings are
      // editorial preferences, not measured probabilities or song confidence.
      const bestSplit = Math.max(...useful.map(item => item.smallerSide));
      const allowance = Math.max(1, Math.floor(this.candidates.length * 0.1));
      const finalists = useful.filter(item => item.smallerSide >= bestSplit - allowance);
      finalists.sort((a, b) =>
        (b.question.answerability ?? 3) - (a.question.answerability ?? 3) ||
        b.smallerSide - a.smallerSide
      );
      return finalists[0].question; // Stable catalog order breaks remaining ties.
    }
    advance() {
      this.currentQuestion = null;
      this.currentGuess = null;
      if (!this.candidates.length) { this.phase = 'stumped'; return; }
      const question = this.candidates.length > 1 ? this.bestQuestion() : null;
      if (question) {
        this.currentQuestion = question;
        this.usedQuestions.add(question.id);
        this.phase = 'question';
        return;
      }
      const guess = this.candidates.find(song => !this.guessedSongs.has(song.id));
      if (!guess) { this.phase = 'stumped'; return; }
      this.currentGuess = guess;
      this.guessedSongs.add(guess.id);
      this.phase = 'guess';
    }
    answer(answer) {
      if (!['yes', 'no', 'unknown'].includes(answer)) return;
      if (!['question', 'guess'].includes(this.phase)) return;
      // Save the complete turn before an answer, including before a victory.
      // Undo restores eliminated songs and the exact question/guess on screen.
      this.history.push({
        candidates: [...this.candidates],
        usedQuestions: new Set(this.usedQuestions),
        guessedSongs: new Set(this.guessedSongs),
        phase: this.phase,
        currentQuestion: this.currentQuestion,
        currentGuess: this.currentGuess,
        confirmedSong: this.confirmedSong,
        answersGiven: this.answersGiven
      });
      this.answersGiven++;
      if (this.phase === 'question') {
        if (answer !== 'unknown') {
          const expected = answer === 'yes';
          this.candidates = this.candidates.filter(song => song.answers[this.currentQuestion.id] === expected);
        }
      } else {
        if (answer === 'yes') {
          this.confirmedSong = this.currentGuess;
          this.phase = 'won';
          return;
        }
        if (answer === 'no') {
          this.candidates = this.candidates.filter(song => song.id !== this.currentGuess.id);
        }
        // Unknown guesses stay candidates, but guessedSongs prevents repeating them.
      }
      this.advance();
    }
    get sprite() { return this.phase === 'won' ? 'assets/scott-victory.png' : 'assets/scott.png'; }
  }
  root.ScottinatorGame = ScottinatorGame;
  if (typeof module !== 'undefined') module.exports = ScottinatorGame;
})(globalThis);
