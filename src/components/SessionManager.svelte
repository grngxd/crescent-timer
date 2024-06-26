<script lang="ts">
    import { css } from "@emotion/css";

    import { currentSession, sessions } from "$lib/stores/sessions";
    import { theme } from "$lib/stores/theme";
    import { timing } from "$lib/stores/timer";
    import { onMount } from "svelte";
    import { quintOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import ArrowRightBold from "./icons/solar/ArrowRightBold.svelte";
    let sessionManager: HTMLDivElement;
    let dropDown: HTMLDivElement;
    let open = false;

    onMount(() => {
        window.addEventListener("click", (event) => {
            if (sessionManager && (!sessionManager.contains(event.target as Node) || dropDown.contains(event.target as Node))) {
                open = false;
            }
        });
    });
</script>

<div class="relative">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="hidden lg:flex flex-row gap-3 items-center cursor-pointer" on:click={() => open = !open} bind:this={sessionManager}>
        <ArrowRightBold class={`w-6 h-6 transition-all ease-out duration-[450] ${css({
            color: open ? `${$theme.colors.text.primary}55` : `${$theme.colors.text.primary}33`,
            transform: open ? "rotate(90deg)" : "rotate(0deg)"
        })}`} />

        <p class={`font-space-grotesk font-light text-2xl ${css({
            color: $theme.colors.text.primary
        })}`}>
            {$sessions.sessions[$currentSession].name}
        </p>

        <p class={`font-space-grotesk font-light text-lg ${css({
            color: `${$theme.colors.text.primary}55`
        })}`}>
            <!-- it is like "222", make it "2x2x2" -->
            {$sessions.sessions[$currentSession].cube.split("").join("x")}
        </p>
    </div>

    <!-- Dropdown Menu -->
    {#if open && !$timing}
        <div class={`absolute hidden lg:flex flex-col gap-1 top-14 right-0 w-64 max-h-48 py-2 px-2 bg-white rounded-lg shadow-lg z-3 overflow-x-clip overflow-y-auto scrollbar-thin ${css({
            color: $theme.colors.text.primary,
            background: `${$theme.colors.text.tertiary}22`,
            scrollbarColor: `${$theme.colors.text.tertiary}55 ${$theme.colors.text.tertiary}22`,
        })}`}
        transition:slide={{duration:150, delay: 0, easing: quintOut}}
        bind:this={dropDown}>

        {#each Object.entries($sessions.sessions) as [key, session]}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class={`flex flex-row gap-3 items-center cursor-pointer p-2 rounded-md transition-all ${css({
                background: $currentSession === key ? `${$theme.colors.text.tertiary}33` : "transparent",
                "&:hover": {
                    background: $currentSession === key ? `${$theme.colors.text.tertiary}44` : `${$theme.colors.text.tertiary}11`
                }
            })}`} on:click|stopPropagation={() => {
                $currentSession = key;  
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

</div>