<script>
  import LeftNavButtons from "./LeftNavButtons.svelte";
  import Scramble from "./Scramble.svelte";

</script>
<div class="w-full absolute text-center z-[2] flex flex-row py-4 px-8 md:px-32 justify-between items-center gap-16 flex-grow backdrop-blur-lg h-min"> 
    <LeftNavButtons />
    <Scramble />
    <LeftNavButtons />
</div>