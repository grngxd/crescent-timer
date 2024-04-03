import type { defaultSettings } from "$lib/settings";
import { writable } from "svelte/store";

export const settings = writable<typeof defaultSettings>();