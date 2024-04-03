<script lang="ts">
  import Navbar from "../components/Navbar.svelte";
  import Scramble from "../components/Scramble.svelte";
  import Timer from "../components/Timer.svelte";
</script>

<div class="flex flex-col h-screen">
  <Scramble />
  <Timer />
  <Navbar />
</div>