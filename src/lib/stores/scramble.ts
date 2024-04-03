import { randomScrambleForEvent } from "cubing/scramble";
import { writable } from "svelte/store";

export const scramble = writable(
    await randomScrambleForEvent("333")
);