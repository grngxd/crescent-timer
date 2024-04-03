<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import type { Alg } from "cubing/alg";
  import { randomScrambleForEvent } from "cubing/scramble";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import ArrowLongLeft from "./icons/mynaui/ArrowLongLeft.svelte";
  import ArrowLongRight from "./icons/mynaui/ArrowLongRight.svelte";

  const scrambles = writable<Alg[]>([]);
  let currentIndex = -1;

  onMount(async () => {
    const initialScramble = await randomScrambleForEvent("222");
    scramble.set(initialScramble);
    scrambles.update(s => [...s, initialScramble]);
    currentIndex++;
  });

  async function previousScramble() {
    if (currentIndex > 0) {
      currentIndex--;
      scramble.set($scrambles[currentIndex]);
    }
  }

  async function newScramble() {
    const newScramble = await randomScrambleForEvent("222");
    scramble.set(newScramble);
    scrambles.update(s => [...s, newScramble]);
    currentIndex++;
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      previousScramble();
      return;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      newScramble();
      return;
    }
  }

  onMount(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });
</script>

<div class={`z-[2] flex flex-row py-4 px-8 md:px-32 justify-center gap-16 items-center flex-grow-0 backdrop-blur-lg ${css({
  backgroundColor: `${$theme.background}22`,
})}`}>
  <button class={`font-space-grotesk font-light text-2xl rounded-full p-2 duration-150 transition-all active:scale-125 ${
    css({
      color: $theme.colors.text.primary,
      ":hover": {
        backgroundColor: `${$theme.colors.text.secondary}55`
      }
    })
  }`} on:click={previousScramble}><ArrowLongLeft /></button>

  <p class={`font-space-grotesk font-light text-2xl ${css({
    color: $theme.colors.text.primary
  })}`}>{$scramble || "Loading Scramble..."}</p>

  <button class={`font-space-grotesk font-light text-2xl rounded-full p-2 duration-200 transition-all active:scale-125 ${
    css({
      color: $theme.colors.text.primary,
      ":hover": {
        backgroundColor: `${$theme.colors.text.secondary}55`
      }
    })
  }`} on:click={newScramble}><ArrowLongRight /></button>
</div>