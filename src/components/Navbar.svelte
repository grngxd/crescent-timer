<script>
  import { timing } from "$lib/stores/timer";
  import { quintInOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import LeftNavButtons from "./LeftNavButtons.svelte";
  import Scramble from "./Scramble.svelte";
  import SessionManager from "./SessionManager.svelte";

</script>

{#if !$timing}
<div
  class="w-full absolute transition-all text-center z-[2] flex flex-row py-4 px-6 justify-between items-center gap-16 flex-grow backdrop-blur-lg h-min"
  transition:slide={{duration:250, axis: "y", delay: 0, easing: quintInOut}}
> 
  <LeftNavButtons />
  <Scramble />
  <SessionManager />
</div>
{/if}