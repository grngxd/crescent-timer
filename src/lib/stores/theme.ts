import { defaultThemes, type Theme } from "$lib/theme";
import { writable } from "svelte/store";

export const theme = writable<Theme>(defaultThemes.dark);