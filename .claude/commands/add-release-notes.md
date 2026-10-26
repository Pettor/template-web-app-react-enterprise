# Add Release Notes

Write the "What's new" release notes for a new **major or minor** version. The user will describe what changed, give a version, or ask you to work it out from the git history.

## Input

$ARGUMENTS

## The one rule: only major and minor versions get notes

The "What's new" dialog appears once when someone moves to a new **release line** (`major.minor`). Patch releases never show it.

| Update                    | Shows "What's new"? |
| ------------------------- | ------------------- |
| `1.x` → `2.0.0` (major)   | ✅ yes              |
| `0.4.x` → `0.5.0` (minor) | ✅ yes              |
| `0.4.2` → `0.4.3` (patch) | ❌ no               |

So:

- **Entries are always `x.y.0`** (`"0.8.0"`, `"2.0.0"`). Never `"0.8.1"`, never `"0.8"`, never a `-beta` suffix. `WhatsNew.test.ts` fails otherwise.
- **A patch release gets no entry.** If the user asks for notes on a patch, tell them patches don't show "What's new", and offer to either fold the change into the next minor's notes or bump to a minor instead.
- **Fixes shipped in patches** since the last minor (`0.7.1`, `0.7.2`, …) belong in the **next minor's** entry, if people would notice them.

## Steps

1. **Work out the version.**
   - Read `version` in `apps/web/package.json`. If the user is bumping now, the new version is the next major or minor (`0.7.3` → `0.8.0`, or `1.4.0` → `2.0.0` for breaking/headline changes).
   - Bump only if the user asked to — use `/bump-version` (or `/bump-minor`, `/bump-major`), which runs `scripts/bump-version.mjs` to keep every `package.json` and `apps/web/.env.demo` in sync. Otherwise just write the notes for the version they name.
   - Notes for a version that's newer than `apps/web/package.json` are fine: they stay hidden until the bump ships.
2. **Gather what changed** since the previous minor (patches included — they don't get their own notes):

   ```sh
   MINOR=$(node -p 'require("./apps/web/package.json").version.replace(/\.\d+$/, ".0")')
   BASE=$(git log --format=%H -S"\"version\": \"$MINOR\"" -- apps/web/package.json | tail -1)
   git log --oneline --no-merges "$BASE"..HEAD
   ```

   If the version was already bumped for this release, `BASE` is the bump itself — use the previous minor's bump commit instead. Focus on `feat:` and user-visible `fix:` commits. Ignore `chore:`, `refactor:`, dependency bumps, CI, tests and docs — nobody gets excited about those.

3. **Add the entry** to `apps/web/src/core/whats-new/ReleaseNotes.ts`:
   - A `const vXYZ = defineMessages({ ... })` block above the previous one (e.g. `v080` for `0.8.0`).
   - An object at the **top** of `RELEASE_NOTES` (newest first).
4. **Generate message ids**: write `id: ""` placeholders and run `pnpm --filter=@app/web lint:fix` — the `formatjs/enforce-id` rule fills in the content-hash ids.
5. **Verify**: `pnpm --filter=@app/storybook exec vitest run --project=unit` (runs `WhatsNew.test.ts`), then check the dialog in Storybook (`Feedback/Whats New Dialog`) if you changed its look.

## Entry shape

```ts
const v080 = defineMessages({
  tagline: {
    description: "ReleaseNotes 0.8.0 - tagline for the release",
    defaultMessage: "Your data, now in technicolor",
    id: "",
  },
  chartsTitle: {
    description: "ReleaseNotes 0.8.0 - highlight title: interactive charts",
    defaultMessage: "Charts you can poke",
    id: "",
  },
  chartsDescription: {
    description: "ReleaseNotes 0.8.0 - highlight text: interactive charts",
    defaultMessage: "Hover any point on the revenue chart to see the exact number. Drag across it to zoom in.",
    id: "",
  },
  // ...
});

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "0.8.0",
    tagline: v080.tagline,
    highlights: [
      { emoji: "📈", title: v080.chartsTitle, description: v080.chartsDescription },
      // ...
    ],
    fixes: [],
  },
  // older entries...
];
```

- `description` follows `"ReleaseNotes <version> - <highlight|fix> <title|text>: <topic>"` so translators know what they're looking at.
- `highlights[0]` gets the big spotlight card — lead with the most exciting thing.

## Make it fun ✨

These notes are a little celebration, not a changelog. People should _want_ to read them.

- **Tagline**: one short, upbeat line that sums up the release ("Everything at your fingertips", "Faster than your coffee").
- **2–5 highlights**, each with:
  - **One emoji** that fits the feature (⚡ 🎨 📊 🔍 🌗 🚀 🧭 🔔). Don't reuse the same emoji within an entry.
  - **A punchy title**, 2–6 words, that sells the benefit: "Ctrl+K superpowers", not "Command palette added".
  - **One or two sentences** in plain, friendly language saying what you can now _do_ and where to find it. Talk to the user ("you"), not about the code.
- **Fixes**: only ones people would actually notice ("Long names no longer get cut off"), under the 🐛 "Bugs squashed" heading. Leave the array empty rather than listing internal fixes.
- **Never mention** refactors, dependencies, tests, CI, file names, component names or ticket numbers.
- Keep it honest — playful, not hype. Don't promise anything that isn't shipped.

| ❌ Dry                               | ✅ Fun                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| "Added command palette component"    | ⚡ **Ctrl+K superpowers** — "Press ⌘K or Ctrl+K anywhere to jump between pages, flip the theme or log out without touching the mouse." |
| "Fixed overflow in navbar on mobile" | 📱 **Comfier on phones** — "The menu slides in as a drawer, so nothing gets squashed on small screens."                                |
| "Refactored theme atoms"             | _(leave it out)_                                                                                                                       |

## Don'ts

- Don't add an entry for a patch version, or edit a released entry's version.
- Don't hardcode strings — everything goes through `defineMessages`.
- Don't touch `WhatsNew.ts` / `UseWhatsNew.ts` to "make a patch show up". The major/minor rule is deliberate.
