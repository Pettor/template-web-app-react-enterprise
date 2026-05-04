import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAppSocialLinks } from "./UseAppSocialLinks";

describe("useAppSocialLinks", () => {
  let windowOpenSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    windowOpenSpy = vi.fn();
    vi.stubGlobal("window", { open: windowOpenSpy });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns onGithubClick and onLinkedInClick handlers", () => {
    const links = useAppSocialLinks("https://github.com/test", "https://linkedin.com/test");
    expect(links).toHaveProperty("onGithubClick");
    expect(links).toHaveProperty("onLinkedInClick");
  });

  describe("onGithubClick", () => {
    it("opens the github link in a new tab", () => {
      const { onGithubClick } = useAppSocialLinks("https://github.com/test", "https://linkedin.com/test");
      onGithubClick();
      expect(windowOpenSpy).toHaveBeenCalledWith("https://github.com/test", "_blank", "noreferrer");
    });
  });

  describe("onLinkedInClick", () => {
    it("opens the linkedin link in a new tab", () => {
      const { onLinkedInClick } = useAppSocialLinks("https://github.com/test", "https://linkedin.com/test");
      onLinkedInClick();
      expect(windowOpenSpy).toHaveBeenCalledWith("https://linkedin.com/test", "_blank", "noreferrer");
    });
  });
});
