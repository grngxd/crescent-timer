<script lang="ts">
    import { css } from "@emotion/css";

    import { settings } from "$lib/stores/settings";
    import { theme } from "$lib/stores/theme";
    import { onMount } from "svelte";
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import ArrowRightBold from "./icons/solar/ArrowRightBold.svelte";
    let sessionManager: HTMLDivElement;
    let dropDown: HTMLDivElement;
    let open = false;

    onMount(() => {
        window.addEventListener("click", (event) => {
            console.log(event.target);
            if (sessionManager && (!sessionManager.contains(event.target as Node) || dropDown.contains(event.target as Node))) {
                open = false;
            }
        });
    });
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="hidden lg:flex flex-row gap-3 items-center cursor-pointer" on:click={() => open = !open} bind:this={sessionManager}>
    <ArrowRightBold class={`w-6 h-6 transition-all ease-out duration-[450] ${css({
        color: `${$theme.colors.text.primary}55`,
        transform: open ? "rotate(90deg)" : "rotate(0deg)"
    })}`} />

    <p class={`font-space-grotesk font-light text-2xl ${css({
        color: $theme.colors.text.primary
    })}`}>
        {$settings.sessions.sessions[$settings.sessions.current].name}
    </p>

    <p class={`font-space-grotesk font-light text-lg ${css({
        color: `${$theme.colors.text.primary}55`
    })}`}>
        <!-- it is like "222", make it "2x2x2" -->
        {$settings.sessions.sessions[$settings.sessions.current].cube.split("").join("x")}
    </p>
</div>

<!-- Dropdown Menu -->
{#if open}
    <div class={`absolute hidden lg:flex flex-col gap-1 top-16 right-6 w-64 max-h-48 py-2 px-2 bg-white rounded-lg shadow-lg z-3 overflow-x-clip overflow-y-auto scrollbar scrollbar-thin ${css({
        color: $theme.colors.text.primary,
        background: `${$theme.colors.text.tertiary}22`,
        scrollbarColor: `${$theme.colors.text.tertiary}55 ${$theme.colors.text.tertiary}22`,
    })}`}
    transition:slide={{duration:300, delay: 0, easing: quintOut}}
    bind:this={dropDown}>

    {#each Object.entries($settings.sessions.sessions) as [key, session]}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class={`flex flex-row gap-3 items-center cursor-pointer p-2 rounded-md transition-all ${css({
            background: $settings.sessions.current === key ? `${$theme.colors.text.tertiary}33` : "transparent",
            "&:hover": {
                background: $settings.sessions.current === key ? `${$theme.colors.text.tertiary}44` : `${$theme.colors.text.tertiary}11`
            }
        })}`} on:click|stopPropagation={() => {
            $settings.sessions.current = key;
        }}>
            <p class={`font-space-grotesk font-light text-2xl ${css({
                color: $theme.colors.text.primary
            })}`}>
                {session.name}
            </p>

            <p class={`font-space-grotesk font-light text-lg ${css({
                color: `${$theme.colors.text.primary}55`
            })}`}>
                {session.cube.split("").join("x")}
            </p>
        </div>
    {/each}

    </div>
{/if}
