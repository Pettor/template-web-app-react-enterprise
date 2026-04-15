import type { AppSessionContent } from "~/core/session/AppSessionContent";

export const AppSessionData: AppSessionContent = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  onSettings: () => console.log("onSettings"),
  onLogout: () => console.log("onLogout"),
  onSearch: () => console.log("onSearch"),
};
