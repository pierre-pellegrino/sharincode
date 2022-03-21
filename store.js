import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const showNewPostModalAtom = atom(false);

export const userAtom = atom(null);

export const isConnectedAtom = atom((get) => get(userAtom) !== null);

export const preferedThemeAtom = atomWithStorage("prefered-theme", "material");
