<script lang="ts">
  import { scramble, scrambles } from "$lib/stores/scramble";
  import { currentSession, sessions } from "$lib/stores/sessions";
  import { theme } from "$lib/stores/theme";
  import { time } from "$lib/stores/timer";
  import { css } from "@emotion/css";
  import { randomScrambleForEvent } from "cubing/scramble";
  import { onMount } from "svelte";
  import ArrowLongLeft from "./icons/mynaui/ArrowLongLeft.svelte";
  import ArrowLongRight from "./icons/mynaui/ArrowLongRight.svelte";

  let currentIndex = -1;

  onMount(async () => {
    const initialScramble = await randomScrambleForEvent($sessions.sessions[$currentSession].cube);
    scramble.set(initialScramble);
    scrambles.set([initialScramble]);
    currentIndex++;
  });

  currentSession.subscribe(async (v) => {
    scramble.set(
      await randomScrambleForEvent($sessions.sessions[v].cube)
    )
  });

  async function previousScramble() {
    if (currentIndex > 0) {
      currentIndex--;
      scramble.set($scrambles[currentIndex]);
    }

    time.set(0);
  }

  async function nextScramble() {
    if (currentIndex < $scrambles.length - 1) {
      currentIndex++;
      scramble.set($scrambles[currentIndex]);
    } else {
      const newScramble = await randomScrambleForEvent($sessions.sessions[$currentSession].cube)
      scramble.set(newScramble);
      scrambles.update(s => [...s, newScramble]);
      currentIndex++;
    }

    time.set(0);
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      previousScramble();
      return;
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      nextScramble();
      return;
    }
  }

  onMount(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  });
</script>

<div class="w-full flex items-center justify-center gap-8 flex-grow">
  <button class={`font-space-grotesk font-light text-2xl rounded-full p-3 duration-150 transition-all active:scale-125 ${
    css({
      color: $theme.colors.text.primary,
      ":hover": {
        backgroundColor: `${$theme.colors.text.secondary}55`
      }
    })
  }`} on:click={previousScramble}><ArrowLongLeft /></button>

  <p class={`font-space-grotesk font-light text-xl md:text-2xl ${css({
    color: $theme.colors.text.primary,
    // if md, word spacing is 0em, else -0.1em
    wordSpacing: "0.15em",
    "@media (max-width: 768px)": {
      wordSpacing: "-0.1em"
    }
  })}`}>{$scramble || "Loading Scramble..."}</p>

  <button class={`font-space-grotesk font-light text-2xl rounded-full p-3 duration-200 transition-all active:scale-125 ${
    css({
      color: $theme.colors.text.primary,
      ":hover": {
        backgroundColor: `${$theme.colors.text.secondary}55`
      }
    })
  }`} on:click={nextScramble}><ArrowLongRight /></button>
</div>