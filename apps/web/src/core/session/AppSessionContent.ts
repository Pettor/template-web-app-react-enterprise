export interface AppSessionContent {
  name: string;
  email: string;
  onSettings: () => void;
  onLogout: () => void;
  onSearch: () => void;
}
