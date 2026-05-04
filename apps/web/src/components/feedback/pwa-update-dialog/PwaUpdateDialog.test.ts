import { describe, expect, it, vi } from "vitest";
import { PwaUpdateDialogProps } from "./PwaUpdateDialog";

describe("PwaUpdateDialogProps", () => {
  function makeMockIntl(
    formatMessage = (d: { defaultMessage: string }, _values?: Record<string, unknown>) => d.defaultMessage
  ) {
    return { formatMessage: vi.fn(formatMessage) };
  }

  it("returns a tuple with the message string as the first element", () => {
    const intl = makeMockIntl();
    const [message] = PwaUpdateDialogProps(intl as never, "MyApp", vi.fn(), vi.fn());
    expect(message).toBe("A new version of {appName} is available");
  });

  it("formats the message with the provided appName", () => {
    const intl = makeMockIntl((d: { defaultMessage: string }, values?: Record<string, unknown>) => {
      if (values && "appName" in values) return `A new version of ${values.appName} is available`;
      return d.defaultMessage;
    });
    const [message] = PwaUpdateDialogProps(intl as never, "CoolApp", vi.fn(), vi.fn());
    expect(message).toBe("A new version of CoolApp is available");
  });

  it("returns options as the second element", () => {
    const intl = makeMockIntl();
    const [, options] = PwaUpdateDialogProps(intl as never, "MyApp", vi.fn(), vi.fn());
    expect(options).toBeDefined();
  });

  it("wires onClose callback into options", () => {
    const intl = makeMockIntl();
    const onClose = vi.fn();
    const [, options] = PwaUpdateDialogProps(intl as never, "MyApp", onClose, vi.fn());
    expect(options?.onClose).toBe(onClose);
  });

  it("wires onRefresh callback into actionProps.onPress", () => {
    const intl = makeMockIntl();
    const onRefresh = vi.fn();
    const [, options] = PwaUpdateDialogProps(intl as never, "MyApp", vi.fn(), onRefresh);
    expect(options?.actionProps?.onPress).toBe(onRefresh);
  });

  it("calls formatMessage for the update button label", () => {
    const intl = makeMockIntl();
    PwaUpdateDialogProps(intl as never, "MyApp", vi.fn(), vi.fn());
    expect(intl.formatMessage).toHaveBeenCalledTimes(2);
  });

  it("returns the update button label in actionProps.children", () => {
    const intl = makeMockIntl();
    const [, options] = PwaUpdateDialogProps(intl as never, "MyApp", vi.fn(), vi.fn());
    expect(options?.actionProps?.children).toBe("Update");
  });
});
