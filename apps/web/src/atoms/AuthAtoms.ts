import { atom } from "jotai";
import type { AuthStatus } from "~/classes/auth/AuthStatus";

export const authStatusAtom = atom<AuthStatus>("idle");
