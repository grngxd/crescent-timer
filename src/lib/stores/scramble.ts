import type { Alg } from "cubing/alg";
import { writable } from "svelte/store";

export const scramble = writable<Alg>();
export const scrambles = writable<Alg[]>([]);