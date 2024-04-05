<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { theme } from "$lib/stores/theme";
  import { timing } from "$lib/stores/timer";
  import { css } from "@emotion/css";
  import { quintInOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import GraphDownLineDuotone from "./icons/solar/GraphDownLineDuotone.svelte";
  import StopwatchLinear from "./icons/solar/StopwatchLinear.svelte";
  import UserCircleLinear from "./icons/solar/UserCircleLinear.svelte";

  let path: string;
  $: path = $page.url.pathname;
</script>
{#if !$timing}
<div class={`absolute bottom-0 w-screen z-[2] h-[10%] backdrop-blur-lg inline-flex md:hidden ${css({
    backgroundColor: `${$theme.background}22`,
    color: $theme.colors.text.primary
})}`}
transition:slide={{duration:250, axis: "y", delay: 0, easing: quintInOut}}>
    <button class={`text-3xl md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
        backgroundColor: browser ? (path === "/" ? `${$theme.colors.text.tertiary}11` : `${$theme.colors.text.tertiary}05`) : "",
        ":hover": {
            backgroundColor: browser ? (path === "/" ? `${$theme.colors.text.tertiary}16` : `${$theme.colors.text.tertiary}11`) : ""
        }
    })}`} on:click={() => {
        goto("/")
    }}>
        <StopwatchLinear />
    </button>

    <button class={`text-[4rem] md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
        backgroundColor: browser ? (path === "/stats" ? `${$theme.colors.text.tertiary}11` : `${$theme.colors.text.tertiary}05`) : "",
        ":hover": {
            backgroundColor: browser ? (path === "/stats" ? `${$theme.colors.text.tertiary}16` : `${$theme.colors.text.tertiary}11`) : ""
        }
    })}`} on:click={() => {
        goto("/stats")
    }}>
        <GraphDownLineDuotone />
    </button>

    <button class={`text-3xl md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
        backgroundColor: browser ? (path === "/profiles" ? `${$theme.colors.text.tertiary}11` : `${$theme.colors.text.tertiary}05`) : "",
        ":hover": {
            backgroundColor: browser ? (path === "/profiles" ? `${$theme.colors.text.tertiary}16` : `${$theme.colors.text.tertiary}11`) : ""
        }
    })}`} on:click={() => {
        goto("/profiles")
    }}>
        <UserCircleLinear />
    </button>
</div>
{/if}