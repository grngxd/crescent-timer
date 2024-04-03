<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import type { Alg } from "cubing/alg";
  import { randomScrambleForEvent } from "cubing/scramble";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

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
</script>

<div class={`z-[2] flex flex-row py-4 px-8 md:px-32 justify-around items-center flex-grow-0 backdrop-blur-lg ${css({
  backgroundColor: `${$theme.background}22`,
})}`}>
  <button class={`font-space-grotesk font-light text-2xl ${
    css({
      color: $theme.colors.text.primary
    })
  }`} on:click={previousScramble}>Previous Scramble</button>

  <p class={`font-space-grotesk font-light text-2xl ${css({
    color: $theme.colors.text.primary
  })}`}>{$scramble || "Loading Scramble..."}</p>

  <button class={`font-space-grotesk font-light text-2xl ${
    css({
      color: $theme.colors.text.primary
    })
  }`} on:click={newScramble}>Next Scramble</button>
</div>