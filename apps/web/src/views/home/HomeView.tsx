import type { ReactElement } from "react";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { Chip, Separator } from "@heroui/react";
import { useIntl } from "react-intl";
import githubImgSrc from "~/assets/images/github.png";
import herouiImgSrc from "~/assets/images/heroui.png";
import mocksServerImgSrc from "~/assets/images/mocks-server.png";
import netImgSrc from "~/assets/images/net.png";
import playwrightImgSrc from "~/assets/images/playwright.png";
import reactImgSrc from "~/assets/images/react.png";
import storybookImgSrc from "~/assets/images/storybook.png";
import turborepoImgSrc from "~/assets/images/turborepo.png";
import viteImgSrc from "~/assets/images/vite.png";
import { GridItem } from "~/components/display/grid-item/GridItem";

export function HomeView(): ReactElement {
  const intl = useIntl();

  return (
    <>
      <div className="grid w-full place-items-center">
        <div className="h-8" />
        <div className="flex flex-col items-center justify-center gap-4 p-2 text-center">
          <Chip variant="soft" color="accent" className="gap-1">
            <SparklesIcon className="h-3 w-3" />
            <span className="text-xs font-medium">
              {intl.formatMessage({
                description: "HomeView: badge - enterprise-ready tagline",
                defaultMessage: "Enterprise-ready · Open Source",
                id: "2wHLz0",
              })}
            </span>
          </Chip>
          <div>
            <span className="inline-block text-4xl font-medium md:text-5xl lg:text-7xl">
              {intl.formatMessage({
                description: "HomeView: heading - title prefix",
                defaultMessage: "Welcome to",
                id: "1QZlPw",
              })}
              &nbsp;
            </span>
            <span className="from-accent to-danger inline-block bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-7xl">
              {intl.formatMessage({
                description: "HomeView: heading - title accent",
                defaultMessage: "React",
                id: "JZ/dbd",
              })}
              &nbsp;
            </span>
            <span className="inline-block text-4xl font-medium md:text-5xl lg:text-7xl">
              {intl.formatMessage({
                description: "HomeView: heading - title suffix",
                defaultMessage: "Template",
                id: "PLVCy/",
              })}
            </span>
          </div>
          <p className="text-default-500 max-w-2xl text-lg md:text-xl">
            {intl.formatMessage({
              description: "HomeView: body - header tagline",
              defaultMessage: "Highly opinionated and optimized using Turborepo, React and TailwindCSS.",
              id: "QX1B8k",
            })}
          </p>
          <Separator className="my-4 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        <GridItem
          imageSrc={reactImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - React card",
            defaultMessage: "React",
            id: "XsoIXg",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - React card",
            defaultMessage:
              "React is a JavaScript library for building dynamic, high-performing, user interfaces in single-page applications",
            id: "CxvEDl",
          })}
        />
        <GridItem
          imageSrc={viteImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - Vite card",
            defaultMessage: "Vite",
            id: "jfOXeY",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - Vite card",
            defaultMessage:
              "Vite is a blazing fast frontend build tool powering the next generation of web applications. ",
            id: "w8OoOB",
          })}
        />
        <GridItem
          imageSrc={turborepoImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - Turborepo card",
            defaultMessage: "Turborepo",
            id: "gitfmL",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - Turborepo card",
            defaultMessage:
              "TurboRepo is a tool that accelerates software development by managing multiple interdependent repositories as a single unified workspace.",
            id: "2oN8RY",
          })}
        />
        <GridItem
          imageSrc={herouiImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - TailwindCSS + HeroUI card",
            defaultMessage: "TailwindCSS + HeroUI",
            id: "aqwmwM",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - TailwindCSS + HeroUI card",
            defaultMessage:
              "Tailwind CSS is a utility-first CSS framework for building custom designs quickly, while HeroUI extends Tailwind CSS with ready-to-use components for faster frontend development.",
            id: "F5jUmL",
          })}
        />
        <GridItem
          imageSrc={storybookImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - Storybook card",
            defaultMessage: "Storybook",
            id: "7mNl6C",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - Storybook card",
            defaultMessage:
              "Storybook is a development environment for UI components that allows for isolated development, testing, and showcasing of each component.",
            id: "UDyEJI",
          })}
        />
        <GridItem
          imageSrc={playwrightImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - test framework card",
            defaultMessage: "Robust Test Framework",
            id: "poLoLA",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - test framework card",
            defaultMessage:
              "Robust test framework using Playwright, Storybook visual testing and Vitest for unit, integration and end-to-end testing.",
            id: "507r86",
          })}
        />
        <GridItem
          imageSrc={githubImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - Github Actions card",
            defaultMessage: "Github Actions",
            id: "0/QQOq",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - Github Actions card",
            defaultMessage:
              "Github Actions is a CI/CD tool that allows you to automate, customize, and execute your software development workflows right in your repository.",
            id: "njN5Zt",
          })}
        />
        <GridItem
          imageSrc={netImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - .NET backend card",
            defaultMessage: ".NET Backend Available",
            id: "ZKoyBG",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - .NET backend card",
            defaultMessage: "C# backend template available fully integrated with React template.",
            id: "vJODZ7",
          })}
        />
        <GridItem
          imageSrc={mocksServerImgSrc}
          title={intl.formatMessage({
            description: "HomeView: heading - mock API server card",
            defaultMessage: "Mock Api Server",
            id: "k8CNbN",
          })}
          description={intl.formatMessage({
            description: "HomeView: body - mock API server card",
            defaultMessage:
              "Mock API server using Mocks Server for frontend development and quickly iterate Api design.",
            id: "LZ/VHM",
          })}
        />
      </div>
    </>
  );
}
