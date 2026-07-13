# LingoApp

A Duolingo-style language learning web app. The starter course teaches Spanish
to English speakers across four units (Basics, People, Food, Travel), each with
two lessons.

## Features

- **Skill path** — units and lessons unlock in order as you complete them
- **Four exercise types** — multiple choice (both translation directions),
  sentence building from a word bank, pair matching, and typed translation
- **Forgiving answer checking** — contractions, synonyms, and alternate valid
  Spanish word orders are accepted (per-sentence accept-lists in the course data)
- **Game mechanics** — XP per lesson (with a perfect-run bonus), hearts lost on
  mistakes (refilled daily and on lesson completion), and a daily streak
- **Mistake review** — missed exercises come back at the end of the session
- **Audio** — Spanish prompts are spoken aloud via the browser's speech
  synthesis
- **Progress persistence** — everything is stored in `localStorage`; no backend
  or account needed

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and produce a production build
npm run lint     # run oxlint
```

Built with React 19, TypeScript, and Vite.

## Adding content

Course content lives in `src/data/course.ts`. Add vocab items and sentences to
a lesson (or add new lessons/units) and the exercise generator in
`src/lib/exercises.ts` turns them into a shuffled session automatically —
distractor options are drawn from the rest of the course.
