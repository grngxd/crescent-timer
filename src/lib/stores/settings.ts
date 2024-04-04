import { defaultSettings, type Settings } from "$lib/settings";
import { writable } from "svelte/store";

export const settings = writable<Settings>(defaultSettings);