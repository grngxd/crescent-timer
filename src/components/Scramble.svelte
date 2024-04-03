<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import { randomScrambleForEvent } from "cubing/scramble";
  import { onMount } from "svelte";
  onMount(async () => {
    scramble.set(await randomScrambleForEvent("333"));
    console.log($scramble);
  });
</script>

<p class={`font-space-grotesk font-semibold text-2xl ${css({
  color: $theme.colors.text.primary
})}`}>{$scramble}</p>