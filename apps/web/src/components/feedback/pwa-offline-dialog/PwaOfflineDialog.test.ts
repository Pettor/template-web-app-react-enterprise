import { describe, expect, it, vi } from "vitest";
import { PwaOfflineDialogProps } from "./PwaOfflineDialog";

describe("PwaOfflineDialogProps", () => {
  function makeMockIntl(formatMessage = (d: { defaultMessage: string }) => d.defaultMessage) {
    return { formatMessage: vi.fn(formatMessage) };
  }

  it("returns a tuple with the message string as the first element", () => {
    const intl = makeMockIntl();
    const [message] = PwaOfflineDialogProps(intl as never, vi.fn());
    expect(message).toBe("Ready to work offline");
  });

  it("returns options with onClose as the second element", () => {
    const intl = makeMockIntl();
    const [, options] = PwaOfflineDialogProps(intl as never, vi.fn());
    expect(options).toBeDefined();
    expect(options).toHaveProperty("onClose");
  });

  it("wires the onClose callback into options", () => {
    const intl = makeMockIntl();
    const onClose = vi.fn();
    const [, options] = PwaOfflineDialogProps(intl as never, onClose);
    expect(options.onClose).toBe(onClose);
  });

  it("calls formatMessage once for the offline message", () => {
    const intl = makeMockIntl();
    PwaOfflineDialogProps(intl as never, vi.fn());
    expect(intl.formatMessage).toHaveBeenCalledTimes(1);
  });

  it("calls formatMessage with the correct message descriptor", () => {
    const intl = makeMockIntl();
    PwaOfflineDialogProps(intl as never, vi.fn());
    expect(intl.formatMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "Q9Hkx1",
        defaultMessage: "Ready to work offline",
      })
    );
  });
});
