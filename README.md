# Scottinator

A build-free browser guessing game for MEJO 187. The catalog contains **87 distinct officially released Strokes songs**, checked through **November 11, 2026**.

## Run

Double-click **index.html**, or open it with Chrome, Edge, Firefox or Safari. No installation, account, internet connection or server is needed. Keep the JavaScript, CSS and assets beside the HTML file. Open the folder in VS Code to edit it.

## Catalog coverage

- Is This It: 12 songs, including both regional track-nine songs, New York City Cops and When It Started.
- Room on Fire: all 11 songs.
- First Impressions of Earth: all 14 songs.
- Angles: all 10 songs.
- Comedown Machine: all 11 standard songs, plus Fast Animals in the bonus-track group.
- The New Abnormal: all 9 songs.
- Reality Awaits: all 9 songs, with the band store's final title Tyrants of the Mellow Moon.
- Future Present Past: its 3 distinct songs.
- Eight B-sides, bonus tracks and released covers: Modern Girls & Old Fashion Men, Clampdown, Elephant Song, Hawaii, I'll Try Anything Once, Life's a Gas, Mercy Mercy Me (The Ecology), and Fast Animals.

The Modern Age EP's songs are already represented by their album titles. Alternate takes, home recordings, radio edits, live recordings of listed songs and the Moretti remix of Oblivius share their song's choice. Separately titled releases such as I'll Try Anything Once and Fast Animals remain separate choices. Life's a Gas includes short Ramones medley excerpts, which are not separate released tracks.

This is the released-song catalog, not every performance or leaked recording. Unreleased demos (such as In Her Prime, Clear Skies and Rhythm Song), incidental documentary music, solo work and side projects are outside its scope. The searchable in-game list shows the exact supported titles. Searching never passes a choice to Scott.

Catalog numbers show positions within each album or EP. Both regional Is This It songs show track 09; Fast Animals shows Bonus 12. A dash marks a non-album release. They are not running numbers across the whole catalog.

## Edit the game

- **songs-data.js**: all songs, clue facts, source URLs, clue definitions and computed answers.
- index.html: page structure and copy.
- styles.css: responsive layout and styling.
- game-engine.js: candidate filtering, question selection, guesses and round state.
- game.js: catalog display, search, buttons, text and sprites.
- assets/scott.png / assets/scott-victory.png: supplied sprites, unchanged.

Every catalog row has a unique ID, title, release/group, year, album membership, track position, duration where verified, cover status and lyric evidence where verified. Fields are labeled in the data file. A row is plain JavaScript; no data download or build step runs.

## Add another song

1. Copy a row in the songs array in songs-data.js and give it a unique ID and title.
2. Verify its release, year, album, full album track position, cover status and duration; retain a supporting source URL. Use album: null for an EP-only song or non-album B-side.
3. Set titleSung to true or false only after checking the reference recording's full lyrics, and add lyricsSource. If you cannot verify that fact, use null. Use seconds: null for an unverified duration.
4. Answers are calculated by the question definitions in the same file. If adding a new album or bonus track, extend the membership and track-position definitions. Fast Animals has explicit Japanese bonus-track handling.
5. Add a distinguishing, sourced question if needed. For custom questions, return a boolean, or null for an unverified fact; set `allowsUnknown: true` for optional facts. Give the question an integer `answerability` rating from 1 to 5.
6. Run the tests below and update the independent expected-release counts. All on-screen song counts update automatically.

## Verification and clue definitions

Each row links its album track list or original single/fan-club release evidence. The data file's sources array collects these links. The 2026 album titles were checked against the band's own store; one Sony listing still used the earlier closing-track title Pros and Cons, so the game uses the final band-store title instead. The B-side list was checked against RCA/Legacy's Singles Volume 01 announcement, with separate sources for Life's a Gas, Fast Animals and the fan-club Elephant Song.

First Impressions of Earth first appeared in Germany in December 2005 and in the US in January 2006. The catalog uses the US album year; both dates give the same answers to this game's release-era questions. A concert debut does not count as an official release.

The full-title lyric clue means the title's words, consecutively and in order, anywhere in the reference recording. Spelling differences that sound identical count: Last Nite is Yes. Heart in a Cage is No: its similar lyric does not contain the full title. Published lyric references are retained per song. A title alone is never evidence that it is sung.

**Unverified lyric/duration facts are null, never false.** Scott asks a question only if every remaining candidate has a verified boolean answer for it. This keeps partially documented songs playable without inventing clues or eliminating them on uncertain evidence. All songs have complete answers for the literal title, album, release-era, cover and track-position questions. The full-title lyric clue currently covers 60 songs.

### Listener clues and evidence

Eight additional questions cover recognizable vocal details: whether the title starts the singing, mentions of TV/radio, a named weekday, the words wait/waiting, and four distinctive vocal phrases. The `listenerFacts` section in **songs-data.js** contains explicit Yes/No answers and a published lyric source for each of the 32 checked recordings: all catalog tracks from Is This It, Room on Fire and The New Abnormal. These additions were checked on November 13, 2026. Both positive and negative answers were checked; a title by itself is not lyric evidence. This is not yet listener-clue coverage for all 87 songs.

To expand that coverage, add a song ID to `listenerFacts`, supply its source URL, and enter each verified answer. Omit a fact or use null when uncertain. The validator rejects unknown IDs, misspelled clue keys, missing evidence and values other than boolean/null. Missing songs or facts always return null, so adding a catalog song never silently labels it No. To add a new listener question, append its ID, question and hint to `listenerQuestions`, then verify its answers in `listenerFacts`. No lyrics are fetched at runtime and no complete lyrics are stored in the project.

Use the album/reference recording. Non-word sounds before the singing do not count toward the title-opening clue; an extra actual word does. Last Nite counts by sound. The weekday clue counts named days and their plurals, not weekdays or yesterday. The wait clue includes waitin', but excludes waited and wasting. The spoken Fab question concerns the specific phrase, not every mention of the drummer. Question hints explain these boundaries to players.

Reference recordings are the studio album versions where available, otherwise the original non-album release. Album questions include regional editions and Japanese bonus tracks. Track positions refer to the whole album, not vinyl side numbers. Duration means strictly more than four minutes; exactly four minutes is No. Title word counts follow printed space-separated words, including & and parenthetical words. Numerals mean written digits. These definitions also appear in the question hints.

## Round behavior

Scott considers only unused, fully verified questions for which both Yes and No remove candidates. He finds the most even split, then considers nearby splits whose smaller group has at most one song (or 10% of the remaining songs, rounded down, whichever is larger) fewer than the best split. Among those questions he prefers higher answerability, then the more even split, then catalog order. For example, with ten candidates a familiar 4/6 clue can beat a 5/5 track-position clue, but a 1/9 clue cannot.

Ratings live beside the questions in **songs-data.js**: 5 for recognizable vocals, 4 for literal title clues, 3 for album/release-era facts, 2 for duration and 1 for track positions. These are editable editorial estimates, not measured player probabilities or confidence in a guess. Track questions remain available as fallbacks. In accurate-answer simulations across all 87 songs, this update reduced track-position questions from 186 to 97 total; the longest route changed from seven to eight clues. That is a logic benchmark, not a listener playtest.

Both Yes and No still narrow the field. Unknown answers retain every candidate and skip the question. No question or guess repeats in a round.

With one candidate, or no useful questions remaining, Scott guesses with his regular sprite. Yes to a guess is the only route to victory. No removes that song and continues; unknown keeps it as a candidate but marks its guess tried. Exhausted guesses lead to You stumped me. Start over and Play again reset the candidates, questions, guesses, search and sprite.

Use **Undo answer** to restore the previous question or guess and all candidates removed by that answer. It also works after a win or stumped ending, and can rewind several answers. Undoing a confirmed guess restores the regular sprite. Reset clears undo history. Questions repeat only when you explicitly rewind to an earlier turn.

The game uses exact elimination: a Yes/No that conflicts with a song's stored clue rules it out for the rest of the current answer path. Use unknown for facts you do not know. Tests that feed stored answers back into the engine verify reachability and logic; they cannot prove that every real-world clue is accurate or that every question is clear to a listener.

## Checks

With Node.js installed:

```sh
node tests/game.test.cjs
node tests/ui.test.cjs
```

The engine suite checks every song's accurate path and first guess, all-skipped clues, each individually skipped clue, each sole-known clue, seeded mixed-answer rounds, unknown/rejected fallback paths, answerability within the permitted balance window, verified-clue eligibility, candidate preservation, no repeats, victory gating and full reset. Small independent selection fixtures test close splits, unacceptable splits, tie breaks, skipped clues and missing evidence. Listening fixtures cover specific verified facts and traps such as an unsung weekday in a title. The suite also exhausts fallback combinations on small catalogs. Its input schedules scale with catalog size; it does not attempt an exponential enumeration of the full catalog.

Every nonterminal transition consumes a previously unused question or guess, so every round ends within the number of questions plus the number of songs. The page integration suite checks the actual scripts and button events against the expanded catalog, including counts, search privacy, all 87 reveals, exactly three answer buttons, sprite gating, both end states and reset. It uses a lightweight DOM fixture; it does not verify visual layout in a browser.
