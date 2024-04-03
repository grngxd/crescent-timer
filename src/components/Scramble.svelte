<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import { randomScrambleForEvent } from "cubing/scramble";
  import { onMount } from "svelte";
  onMount(async () => {
    scramble.set(await randomScrambleForEvent("333"));
  });
</script>

<div class={`flex flex-row py-4 px-32 justify-center items-center flex-grow-0 bg-opacity-50 backdrop-blur-3xl ${css({
  backgroundColor: $theme.background
})}`}>
  <!-- <Icon class={`h-24 w-24 ${
    css({
        fill: $theme.colors.text.primary,
        color: $theme.colors.text.primary
    })
  }`} /> -->
  
  <p class={`font-space-grotesk font-light text-2xl ${css({
    color: $theme.colors.text.primary
  })}`}>{$scramble || "Loading Scramble..."}</p>
</div>
