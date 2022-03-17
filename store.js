import { atom } from "jotai";

export const showNewPostModalAtom = atom(false);

export const userAtom = atom(null);

export const isConnectedAtom = atom((get) => get(userAtom) !== null);
