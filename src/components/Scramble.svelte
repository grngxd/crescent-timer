<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { onMount } from "svelte";
  onMount(() => {
    console.log($scramble);
  });
</script>

{$scramble} 