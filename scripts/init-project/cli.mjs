import { createInterface } from "node:readline/promises";

const SEMVER_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/;
const TRUE_VALUES = new Set(["true", "yes", "y", "1"]);
const FALSE_VALUES = new Set(["false", "no", "n", "0"]);

const DEFAULT_DEV_PORT = 5173;
const DEV_PORT_RANDOM_MIN = 5000;
const DEV_PORT_RANDOM_MAX = 5400;
// Floor guarantees the derived e2e port (devPort - 1000) never drops below
// the reserved-port boundary (1024), regardless of whether backend is kept.
const MIN_DEV_PORT = 2024;
const MAX_DEV_PORT = 65535;

/**
 * Parses `--key=value`, `--key value`, and bare boolean `--flag` forms.
 */
function parseArgv(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const eq = arg.indexOf("=");
    if (eq !== -1) {
      flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags[key] = next;
      i++;
    } else {
      flags[key] = "true";
    }
  }
  return flags;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseBoolean(value, fieldName) {
  const normalized = String(value).trim().toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;
  throw new Error(`--${fieldName} must be one of yes/no/true/false (got "${value}")`);
}

function randomDevPort() {
  return Math.floor(Math.random() * (DEV_PORT_RANDOM_MAX - DEV_PORT_RANDOM_MIN + 1)) + DEV_PORT_RANDOM_MIN;
}

/** Parses the raw `--dev-port` value: empty -> default, "random" -> randomized, else manual. */
function parseDevPort(rawValue) {
  const value = String(rawValue ?? "").trim();
  let devPort;
  if (!value) {
    devPort = DEFAULT_DEV_PORT;
  } else if (value.toLowerCase() === "random") {
    devPort = randomDevPort();
  } else {
    devPort = Number(value);
    if (!Number.isInteger(devPort)) throw new Error(`--dev-port "${rawValue}" is not a valid port number.`);
  }

  if (devPort < MIN_DEV_PORT || devPort > MAX_DEV_PORT) {
    throw new Error(`--dev-port must be between ${MIN_DEV_PORT} and ${MAX_DEV_PORT} (got ${devPort}).`);
  }

  return devPort;
}

async function promptAnswers(flags) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answers = { ...flags };

    if (!answers["repo-name"]) {
      answers["repo-name"] = await rl.question("Repo name (e.g. my-app): ");
    }
    if (!answers["project-name"]) {
      answers["project-name"] = await rl.question("Project name (human-readable, e.g. My App): ");
    }
    if (!answers.version) {
      const version = await rl.question("Initial version [0.1.0]: ");
      answers.version = version.trim() || "0.1.0";
    }
    if (!answers["dev-port"]) {
      const devPort = await rl.question(
        `Dev server port — press Enter for default (${DEFAULT_DEV_PORT}), type "random" for a random port ` +
          `(${DEV_PORT_RANDOM_MIN}-${DEV_PORT_RANDOM_MAX}), or enter a specific port number: `
      );
      answers["dev-port"] = devPort.trim();
    }
    if (!answers.backend) {
      const backend = await rl.question("Does this project need a backend? (y/N): ");
      answers.backend = backend.trim() || "no";
    }
    if (parseBoolean(answers.backend, "backend") && !answers["backend-host"]) {
      const host = await rl.question("Backend host [http://localhost]: ");
      answers["backend-host"] = host.trim() || "http://localhost";
    }
    if (parseBoolean(answers.backend, "backend") && !answers["backend-port"]) {
      const port = await rl.question("Backend port [5000]: ");
      answers["backend-port"] = port.trim() || "5000";
    }
    if (!answers.yes) {
      const proceed = await rl.question("\nApply these changes? (y/N): ");
      if (!TRUE_VALUES.has(proceed.trim().toLowerCase())) {
        throw new Error("Aborted by user.");
      }
    }

    return answers;
  } finally {
    rl.close();
  }
}

/**
 * Collects and validates every answer the init script needs, either from CLI
 * flags (agent-driven, non-interactive) or interactive prompts (human-driven,
 * requires a real TTY on stdin).
 */
export async function collectAnswers(argv) {
  const flags = parseArgv(argv);

  const requiredKeys = ["repo-name", "project-name", "version", "backend"];
  const missing = requiredKeys.filter((key) => !flags[key]);

  let raw;
  if (missing.length === 0) {
    raw = flags;
  } else if (process.stdin.isTTY) {
    raw = await promptAnswers(flags);
  } else {
    throw new Error(
      `Missing required flags: ${missing.map((key) => `--${key}`).join(", ")}.\n` +
        `Run interactively in a terminal, or pass all flags explicitly, e.g.:\n` +
        `  node scripts/init-project/index.mjs --repo-name=my-app --project-name="My App" --version=0.1.0 --backend=false --yes`
    );
  }

  const repoName = slugify(raw["repo-name"]);
  if (!repoName) throw new Error(`--repo-name "${raw["repo-name"]}" produced an empty slug.`);

  const projectName = String(raw["project-name"]).trim();
  if (!projectName) throw new Error("--project-name must not be empty.");

  const version = String(raw.version).trim();
  if (!SEMVER_RE.test(version)) throw new Error(`--version "${version}" is not valid semver (e.g. 0.1.0).`);

  const devPort = parseDevPort(raw["dev-port"]);
  const e2ePort = devPort - 1000;

  const backend = parseBoolean(raw.backend, "backend");

  let backendHost;
  let backendPort;
  if (backend) {
    backendHost = String(raw["backend-host"] ?? "http://localhost").trim();
    backendPort = String(raw["backend-port"] ?? "5000").trim();
    if (!/^\d+$/.test(backendPort)) throw new Error(`--backend-port "${backendPort}" must be numeric.`);
  }

  const shortName = projectName.length > 12 ? projectName.slice(0, 12).trim() : projectName;

  return {
    repoName,
    projectName,
    shortName,
    version,
    devPort,
    e2ePort,
    backend,
    backendHost,
    backendPort,
  };
}
