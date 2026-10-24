import { defineMessages, type MessageDescriptor } from "react-intl";

export interface ReleaseNoteItem {
  emoji: string;
  title: MessageDescriptor;
  description: MessageDescriptor;
}

export interface ReleaseNote {
  /**
   * A major or minor version, always `x.y.0` (e.g. "0.8.0", "2.0.0"). Patch releases never get
   * notes; anyone arriving at any `x.y.*` from an older release line sees this entry.
   */
  version: string;
  /** Short, upbeat headline for the release, e.g. "Everything at your fingertips". */
  tagline: MessageDescriptor;
  /** Two to five highlights people will get excited about. The first one gets the spotlight. */
  highlights: ReleaseNoteItem[];
  /** Only fixes people would actually notice. */
  fixes: ReleaseNoteItem[];
}

const v080 = defineMessages({
  tagline: {
    description: "ReleaseNotes 0.8.0 - tagline for the release",
    defaultMessage: "Your data, wherever you go",
    id: "TNHtYI",
  },
  syncTitle: {
    description: "ReleaseNotes 0.8.0 - highlight title: folder and GitHub sync",
    defaultMessage: "Sync to a folder or GitHub",
    id: "81alBY",
  },
  syncDescription: {
    description: "ReleaseNotes 0.8.0 - highlight text: folder and GitHub sync",
    defaultMessage:
      "Open Settings → Sync and point the app at a folder, a Git repo on your computer or a private GitHub repository. Every device you connect stays in step.",
    id: "zG3oyJ",
  },
  statusTitle: {
    description: "ReleaseNotes 0.8.0 - highlight title: sync status",
    defaultMessage: "Always know where you stand",
    id: "dNwIGk",
  },
  statusDescription: {
    description: "ReleaseNotes 0.8.0 - highlight text: sync status",
    defaultMessage:
      "A little cloud in the top bar shows when you last synced, what's still waiting and if anything needs your attention. Tap it to jump straight to the settings.",
    id: "o560Cu",
  },
  notesTitle: {
    description: "ReleaseNotes 0.8.0 - highlight title: notes",
    defaultMessage: "Jot it down",
    id: "du4EzI",
  },
  notesDescription: {
    description: "ReleaseNotes 0.8.0 - highlight text: notes",
    defaultMessage: "A new Notes page to capture ideas, pin the important ones to the top and archive the rest.",
    id: "8SUeNy",
  },
  filesTitle: {
    description: "ReleaseNotes 0.8.0 - highlight title: plain, readable files",
    defaultMessage: "Plain files, no lock-in",
    id: "DTCBU1",
  },
  filesDescription: {
    description: "ReleaseNotes 0.8.0 - highlight text: plain, readable files",
    defaultMessage:
      "Everything is saved as simple files you can open, back up or hand to your favorite AI assistant. Works offline, too.",
    id: "0HBSte",
  },
});

const v070 = defineMessages({
  tagline: {
    description: "ReleaseNotes 0.7.0 - tagline for the release",
    defaultMessage: "Everything at your fingertips",
    id: "0k6HVv",
  },
  paletteTitle: {
    description: "ReleaseNotes 0.7.0 - highlight title: command palette",
    defaultMessage: "Ctrl+K superpowers",
    id: "Hbedsr",
  },
  paletteDescription: {
    description: "ReleaseNotes 0.7.0 - highlight text: command palette",
    defaultMessage:
      "Press ⌘K or Ctrl+K anywhere to jump between pages, flip the theme or log out without ever touching the mouse.",
    id: "qhz+i1",
  },
  dashboardTitle: {
    description: "ReleaseNotes 0.7.0 - highlight title: dashboard",
    defaultMessage: "A dashboard that dazzles",
    id: "ib9PLZ",
  },
  dashboardDescription: {
    description: "ReleaseNotes 0.7.0 - highlight text: dashboard",
    defaultMessage: "KPIs, revenue charts, gauges and recent transactions, all on one shiny page.",
    id: "tOgr/U",
  },
  settingsTitle: {
    description: "ReleaseNotes 0.7.0 - highlight title: settings modal",
    defaultMessage: "Settings, all in one place",
    id: "N4ni6h",
  },
  settingsDescription: {
    description: "ReleaseNotes 0.7.0 - highlight text: settings modal",
    defaultMessage: "Your account, the look of the app and version details now live together in one tidy window.",
    id: "LrerpR",
  },
  themeTitle: {
    description: "ReleaseNotes 0.7.0 - highlight title: theme selector",
    defaultMessage: "Light, dark or follow your system",
    id: "+TMl3e",
  },
  themeDescription: {
    description: "ReleaseNotes 0.7.0 - highlight text: theme selector",
    defaultMessage: "Pick the mood that suits you. We'll remember it for next time.",
    id: "DBs5GN",
  },
  phoneFixTitle: {
    description: "ReleaseNotes 0.7.0 - fix title: phone menu and settings",
    defaultMessage: "Comfier on phones",
    id: "W5/4Nr",
  },
  phoneFixDescription: {
    description: "ReleaseNotes 0.7.0 - fix text: phone menu and settings",
    defaultMessage: "The menu slides in as a drawer and settings scroll as one list on small screens.",
    id: "cUwB93",
  },
});

/**
 * Newest first. When a release bumps the major or minor version in `apps/web/package.json`, add an
 * entry here for `x.y.0`; people who update from an older release line see every entry they missed.
 * Patch releases (`x.y.z`, z > 0) never get an entry. See `/add-release-notes` for the full guide.
 */
export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "0.8.0",
    tagline: v080.tagline,
    highlights: [
      { emoji: "🔄", title: v080.syncTitle, description: v080.syncDescription },
      { emoji: "☁️", title: v080.statusTitle, description: v080.statusDescription },
      { emoji: "📝", title: v080.notesTitle, description: v080.notesDescription },
      { emoji: "📂", title: v080.filesTitle, description: v080.filesDescription },
    ],
    fixes: [],
  },
  {
    version: "0.7.0",
    tagline: v070.tagline,
    highlights: [
      { emoji: "⚡", title: v070.paletteTitle, description: v070.paletteDescription },
      { emoji: "📊", title: v070.dashboardTitle, description: v070.dashboardDescription },
      { emoji: "⚙️", title: v070.settingsTitle, description: v070.settingsDescription },
      { emoji: "🌗", title: v070.themeTitle, description: v070.themeDescription },
    ],
    fixes: [{ emoji: "📱", title: v070.phoneFixTitle, description: v070.phoneFixDescription }],
  },
];
