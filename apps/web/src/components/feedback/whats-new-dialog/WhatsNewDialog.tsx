import type { ReactElement } from "react";
import { Button, Card, Chip, Modal } from "@heroui/react";
import { useIntl } from "react-intl";
import { ConfettiBurst } from "~/components/display/confetti-burst/ConfettiBurst";

export interface WhatsNewItem {
  emoji: string;
  title: string;
  description: string;
}

export interface WhatsNewRelease {
  version: string;
  tagline: string;
  highlights: WhatsNewItem[];
  fixes: WhatsNewItem[];
}

export interface WhatsNewDialogProps {
  isOpen: boolean;
  appName: string;
  /** Newest first. */
  releases: WhatsNewRelease[];
  onClose: () => void;
}

const ENTER_ANIMATION =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 motion-reduce:animate-none";

function staggered(index: number): { animationDelay: string } {
  return { animationDelay: `${150 + index * 90}ms` };
}

function WhatsNewSpotlight({ emoji, title, description }: WhatsNewItem): ReactElement {
  return (
    <Card
      className={`from-accent/15 to-success/10 border-accent/30 border bg-linear-to-br ${ENTER_ANIMATION}`}
      style={staggered(0)}
    >
      <Card.Content className="flex flex-row items-center gap-4">
        <span
          aria-hidden
          className="bg-accent/15 flex size-14 shrink-0 items-center justify-center rounded-2xl text-3xl motion-safe:animate-[bounce_1s_ease-in-out_2]"
        >
          {emoji}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <Card.Title className="text-base font-semibold">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </div>
      </Card.Content>
    </Card>
  );
}

function WhatsNewEntry({ emoji, title, description, index }: WhatsNewItem & { index: number }): ReactElement {
  return (
    <li className={`group flex gap-3 ${ENTER_ANIMATION}`} style={staggered(index)}>
      <span
        aria-hidden
        className="bg-default flex size-10 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
      >
        {emoji}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-foreground text-sm font-semibold">{title}</span>
        <span className="text-muted text-sm">{description}</span>
      </div>
    </li>
  );
}

export function WhatsNewDialog({ isOpen, appName, releases, onClose }: WhatsNewDialogProps): ReactElement {
  const intl = useIntl();
  const [latest] = releases;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="md" scroll="inside">
          <Modal.Dialog
            data-testid="whats-new"
            aria-label={intl.formatMessage({
              description: "WhatsNewDialog - aria-label for the dialog",
              defaultMessage: "What's new",
              id: "6Y65zk",
            })}
          >
            <Modal.CloseTrigger />
            <Modal.Header className="from-accent/25 via-warning/15 to-success/20 relative items-center overflow-hidden rounded-3xl bg-linear-to-br px-6 py-8 text-center">
              <ConfettiBurst active={isOpen} />
              <span aria-hidden className="text-5xl motion-safe:animate-bounce">
                🎉
              </span>
              <Modal.Heading className="text-foreground text-2xl font-bold">
                {intl.formatMessage(
                  {
                    description: "WhatsNewDialog - heading",
                    defaultMessage: "What's new in {appName}",
                    id: "wpUdf0",
                  },
                  { appName }
                )}
              </Modal.Heading>
              {latest && <p className="text-foreground/80 text-sm font-medium">{latest.tagline}</p>}
              {releases.length > 1 && (
                <Chip size="sm" variant="soft" color="warning">
                  {intl.formatMessage(
                    {
                      description: "WhatsNewDialog - badge when the user skipped several releases",
                      defaultMessage: "🍿 {count} releases to catch up on",
                      id: "lUnzgC",
                    },
                    { count: releases.length }
                  )}
                </Chip>
              )}
            </Modal.Header>
            {/* Focusable so keyboard users can scroll long release notes. */}
            <Modal.Body
              tabIndex={0}
              className="focus-visible:ring-accent flex flex-col gap-8 rounded-xl outline-none focus-visible:ring-2"
            >
              {releases.map((release, releaseIndex) => {
                const isLatest = releaseIndex === 0;
                // The newest release's first highlight gets the spotlight card.
                const spotlight = isLatest ? release.highlights[0] : undefined;
                const highlights = isLatest ? release.highlights.slice(1) : release.highlights;
                return (
                  <section
                    key={release.version}
                    data-testid={`whats-new__release-${release.version}`}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip size="sm" variant="soft" color="accent">
                        {intl.formatMessage(
                          {
                            description: "WhatsNewDialog - version label above a release's notes",
                            defaultMessage: "Version {version}",
                            id: "fFBFA3",
                          },
                          { version: release.version }
                        )}
                      </Chip>
                      {isLatest ? (
                        <Chip size="sm" variant="soft" color="success">
                          {intl.formatMessage({
                            description: "WhatsNewDialog - label marking the newest release",
                            defaultMessage: "✨ Brand new",
                            id: "6jgJY/",
                          })}
                        </Chip>
                      ) : (
                        <span className="text-foreground text-sm font-semibold">{release.tagline}</span>
                      )}
                    </div>
                    {spotlight && <WhatsNewSpotlight {...spotlight} />}
                    {highlights.length > 0 && (
                      <ul className="flex flex-col gap-4">
                        {highlights.map((item, index) => (
                          <WhatsNewEntry key={item.title} {...item} index={index + 1} />
                        ))}
                      </ul>
                    )}
                    {release.fixes.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h3 className="text-muted text-xs font-medium tracking-wide uppercase">
                          {intl.formatMessage({
                            description: "WhatsNewDialog - heading above the list of fixed bugs",
                            defaultMessage: "🐛 Bugs squashed",
                            id: "KAcMYs",
                          })}
                        </h3>
                        <ul className="flex flex-col gap-4">
                          {release.fixes.map((item, index) => (
                            <WhatsNewEntry key={item.title} {...item} index={highlights.length + index + 1} />
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="w-full sm:w-auto" onPress={onClose} data-testid="whats-new__close">
                {intl.formatMessage({
                  description: "WhatsNewDialog - button that closes the dialog",
                  defaultMessage: "Let's go! 🚀",
                  id: "7G5r47",
                })}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
