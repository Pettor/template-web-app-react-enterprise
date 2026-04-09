import { type ReactElement } from "react";
import { Avatar, Button, Link, Modal, Surface } from "@heroui/react";
import { GithubIcon, LinkedInIcon, Navbar } from "@package/ui";
import type { ProfileCardProps } from "~/components/feedback/profile-card/ProfileCard";
import { ProfileCard } from "~/components/feedback/profile-card/ProfileCard";
import type { AppSocialLinks } from "~/core/social-links/AppSocialLinks";

export interface NavbarContentProps {
  profile: ProfileCardProps;
  socialLinks: AppSocialLinks;
}

export function NavbarContent({ profile, socialLinks }: NavbarContentProps): ReactElement {
  const { onGithubClick, onLinkedInClick } = socialLinks;
  const { name } = profile;

  function getAvatarFallback(name: string): string {
    const names = name.split(" ");
    if (!names || !names[0]) {
      return "";
    }

    if (names.length === 1 || !names[1]) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }

  const menuRender = (
    <>
      <div key="1">
        <Link href="#">something</Link>
      </div>
      <div key="2">something</div>
    </>
  );

  const centerElement = (
    <>
      <Link href="#">Features</Link>
      <Link aria-current="page" href="#">
        Customers
      </Link>
      <Link href="#">Integrations</Link>
    </>
  );

  const endElement = (
    <div className="flex gap-1">
      <Modal>
        <Modal.Trigger data-testid="home-page__menu-button">
          <Avatar variant="soft" className="cursor-pointer">
            <Avatar.Fallback>{getAvatarFallback(name)}</Avatar.Fallback>
          </Avatar>
        </Modal.Trigger>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.CloseTrigger />
              </Modal.Header>
              <Modal.Body className="py-4">
                <Surface variant="default">
                  <ProfileCard {...profile} />
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onGithubClick}>
        <GithubIcon />
      </Button>
      <Button className="fill-black dark:fill-white" variant="secondary" isIconOnly onPress={onLinkedInClick}>
        <LinkedInIcon />
      </Button>
    </div>
  );

  return <Navbar title="App" centerElement={centerElement} menuElement={menuRender} endElement={endElement} />;
}
