<script lang="ts">
  import { settings } from "$lib/stores/settings";
  import { theme } from "$lib/stores/theme";
  import { Status, mainTimerStore } from "$lib/stores/timer.js";
  import type { Theme } from "$lib/theme";
  import { getTheme } from "$lib/theme";
  import { css } from "@emotion/css";
  import type { Alg } from "cubing/alg";
  import { onMount } from 'svelte';

  let timerElement: HTMLDivElement;
  const timer = mainTimerStore

  let currentScramble: Alg;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      timer.handleDown();
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      timer.handleUp();
    }
  }

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    if (!timerElement.contains(event.target as Node)) return;
    timer.handleDown();
  }

  function handleMouseUp(event: MouseEvent) {
    event.preventDefault();
    if (!timerElement.contains(event.target as Node)) return;
    timer.handleUp();
  }

  function handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    if (!timerElement.contains(event.target as Node)) return;
    timer.handleDown();
  }

  function handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    if (!timerElement.contains(event.target as Node)) return;
    timer.handleUp();
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', timer.stopTimer);
    window.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', timer.stopTimer);
    };
  });

  onMount(() => {
    theme.set(getTheme() as Theme);
  });

  let status = timer.status;
  let formattedTime = timer.formattedTime;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-screen h-screen select-none flex flex-col flex-grow flex-[0.85] gap-4 justify-center items-center"
    bind:this={timerElement}>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <p class={`font-reddit-mono font-normal text-8xl md:text-10xl p-24 ${
        css({
            color: ($status === Status.idle) ? $theme.colors.timer.idle : ($status === Status.waiting) ? $theme.colors.timer.waiting : ($status === Status.ready) ? $theme.colors.timer.ready : $theme.colors.timer.timing
        })
    }`}
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mousedown|preventDefault
    on:mouseup|stopPropagation 
    >
        {$formattedTime}
    </p>

    <div class={`${$settings.timer.showButtons ? "flex": "hidden"} flex-row gap-4 md:hidden`}>
        <button class={`min-w-8 font-space-grotesk font-normal text-2xl px-4 py-2 rounded-lg ${
            css({
                color: $theme.colors.text.primary,
            })
        }`} on:click={() => {
            if ($status === Status.timing) {
                $status = Status.idle;
                $formattedTime = "0.00";
                timer.stopTimer();
            }
        }}>
            +2
        </button>

        <button class={`min-w-8 font-space-grotesk font-normal text-2xl px-4 py-2 rounded-lg ${
            css({
                color: $theme.colors.text.primary,
            })
        }`} on:click={() => {
            if ($status === Status.timing) {
                $status = Status.idle;
                $formattedTime = "0.00";
                timer.stopTimer();
            }
        }}>
            DNF
        </button>
    </div>
</div>