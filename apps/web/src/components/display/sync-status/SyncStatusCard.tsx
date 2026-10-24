import type { ReactElement } from "react";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  CloudIcon,
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Button, Tooltip } from "@heroui/react";
import { type IntlShape, useIntl } from "react-intl";
import type { SyncStatus } from "~/core/sync/SyncAtoms";

export interface SyncStatusCardProps {
  status: SyncStatus;
  /** Opens the sync settings. */
  onPress: () => void;
  /** Rendered at this time; injected so stories are stable. */
  now?: number;
  /** `icon` is a square button for toolbars, with the status in a tooltip. */
  variant?: "card" | "icon";
}

interface StatusDescription {
  icon: ReactElement;
  title: string;
  subtitle: string;
}

function describeStatus(intl: IntlShape, status: SyncStatus, now: number): StatusDescription {
  const folder = status.folderName ?? "";

  switch (status.state) {
    case "local":
      return {
        icon: <ComputerDesktopIcon className="text-default-500 size-[18px]" aria-hidden />,
        title: intl.formatMessage({
          description: "SyncStatusCard: title - data is only stored in this browser",
          defaultMessage: "Only on this device",
          id: "IjXp54",
        }),
        subtitle: intl.formatMessage({
          description: "SyncStatusCard: subtitle - invites to set up sync",
          defaultMessage: "Set up sync",
          id: "/g6cUu",
        }),
      };
    case "needs-permission":
      return {
        icon: <ExclamationTriangleIcon className="text-warning size-[18px]" aria-hidden />,
        title: intl.formatMessage({
          description: "SyncStatusCard: title - folder access must be granted again",
          defaultMessage: "Reconnect folder",
          id: "Pf0N5G",
        }),
        subtitle: folder,
      };
    case "error":
      return {
        icon: <ExclamationTriangleIcon className="text-danger size-[18px]" aria-hidden />,
        title: intl.formatMessage({
          description: "SyncStatusCard: title - sync failed",
          defaultMessage: "Sync problem",
          id: "fNqZCc",
        }),
        subtitle: status.error ?? folder,
      };
  }

  if (status.state === "syncing" || !status.lastSyncedAt) {
    return {
      icon: <ArrowPathIcon className="text-accent size-[18px] motion-safe:animate-spin" aria-hidden />,
      title: intl.formatMessage({
        description: "SyncStatusCard: title - sync in progress",
        defaultMessage: "Syncing…",
        id: "lmoODZ",
      }),
      subtitle: folder,
    };
  }

  if (status.hasPendingChanges) {
    return {
      icon: <CloudArrowUpIcon className="text-warning size-[18px]" aria-hidden />,
      title: intl.formatMessage({
        description: "SyncStatusCard: title - local changes not pushed yet",
        defaultMessage: "Changes waiting to sync",
        id: "NcRAvR",
      }),
      subtitle: folder,
    };
  }

  const seconds = Math.round((Date.parse(status.lastSyncedAt) - now) / 1000);
  let ago: string;
  if (seconds > -60) {
    ago = intl.formatMessage({
      description: "SyncStatusCard: relative time - synced moments ago",
      defaultMessage: "just now",
      id: "dntetV",
    });
  } else if (seconds > -3600) {
    ago = intl.formatRelativeTime(Math.round(seconds / 60), "minute", { numeric: "auto" });
  } else {
    ago = intl.formatRelativeTime(Math.round(seconds / 3600), "hour", { numeric: "auto" });
  }
  return {
    icon: <CloudIcon className="text-success size-[18px]" aria-hidden />,
    title: intl.formatMessage(
      {
        description: "SyncStatusCard: title - last successful sync, e.g. 'Synced 5 minutes ago'",
        defaultMessage: "Synced {ago}",
        id: "dRQayf",
      },
      { ago }
    ),
    subtitle: folder,
  };
}

export function SyncStatusCard({
  status,
  onPress,
  now = Date.now(),
  variant = "card",
}: SyncStatusCardProps): ReactElement {
  const intl = useIntl();
  const { icon, title, subtitle } = describeStatus(intl, status, now);
  const label = subtitle ? `${title}. ${subtitle}` : title;

  if (variant === "icon") {
    return (
      <Tooltip delay={300}>
        <Button
          isIconOnly
          variant="ghost"
          onPress={onPress}
          aria-label={label}
          data-testid="sync-status"
          data-state={status.state}
          className="[&_svg]:size-5"
        >
          {icon}
        </Button>
        <Tooltip.Content placement="bottom">{label}</Tooltip.Content>
      </Tooltip>
    );
  }

  return (
    <Button
      variant="secondary"
      onPress={onPress}
      aria-label={label}
      data-testid="sync-status"
      data-state={status.state}
      className="h-auto w-full justify-start gap-2.5 rounded-xl px-3 py-2.5 text-left font-normal"
    >
      {icon}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-default-500 truncate text-xs">{subtitle}</span>
      </span>
      <ChevronRightIcon className="text-default-500 size-4" aria-hidden />
    </Button>
  );
}
