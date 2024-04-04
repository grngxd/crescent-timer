<script lang="ts">
  import { loading } from '$lib/stores/misc';
  import { quintInOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import Icon from './svg/Icon.svelte';
</script>

{#if $loading}
    <div class="z-[9999999999] absolute flex gap-2 h-screen w-screen justify-center items-center bg-[#121212]" out:slide={{duration: 1000, delay: 100, axis: 'y', easing: quintInOut}}>
        <Icon class="w-56 h-56 text-white animate-pulse" name="loading" />
    </div>
{/if}