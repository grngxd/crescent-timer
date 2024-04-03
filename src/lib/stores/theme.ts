import { defaultTheme } from "$lib/theme";
import { writable } from "svelte/store";

export const theme = writable<typeof defaultTheme>(defaultTheme);