export interface HomeLoaderData {
  githubLink: string;
  linkedInLink: string;
}

export function homeLoader(): HomeLoaderData {
  return {
    githubLink: "https://github.com/Pettor/template-web-app-react",
    linkedInLink: "https://www.linkedin.com/in/petter-hancock/",
  };
}
