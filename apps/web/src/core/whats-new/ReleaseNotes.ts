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
