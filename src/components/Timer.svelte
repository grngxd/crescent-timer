<script lang="ts">
    import { scramble, scrambles } from "$lib/stores/scramble";
    import { settings } from "$lib/stores/settings";
    import { theme } from "$lib/stores/theme";
    import type { Theme } from "$lib/theme";
    import { getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import type { Alg } from "cubing/alg";
    import { randomScrambleForEvent } from "cubing/scramble";
    import { onMount } from 'svelte';
    
    let timer: HTMLDivElement;
    enum Status {
        idle = "idle",
        waiting = "waiting",
        ready = "ready",
        timing = "timing",
        completed = "completed"
    }

    let status = Status.idle;
    let currentScramble: Alg;
    let canSolve = false;
    let formattedTime = "00.00";
    let timerInterval: NodeJS.Timeout | undefined;

    const dev = process.env.NODE_ENV === 'development';

    onMount(async () => {
        currentScramble = await randomScrambleForEvent("222");
        scramble.set(currentScramble);
        scrambles.set([currentScramble]);
    });

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            handleDown();
        }
    }

    function handleKeyUp(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            handleUp();
        }
    }

    function handleMouseDown(event: MouseEvent) {
        event.preventDefault();
        if (!timer.contains(event.target as Node)) return;
        handleDown();
    }

    function handleMouseUp(event: MouseEvent) {
        event.preventDefault();
        if (!timer.contains(event.target as Node)) return;
        handleUp();
    }

    function handleTouchStart(event: TouchEvent) {
        event.preventDefault();
        if (!timer.contains(event.target as Node)) return;
        handleDown();
    }

    function handleTouchEnd(event: TouchEvent) {
        event.preventDefault();
        if (!timer.contains(event.target as Node)) return;
        handleUp();
    }

    let waitingTimeout: NodeJS.Timeout | undefined;

    async function handleDown() {
        if (status === Status.idle) {
            status = Status.waiting
            waitingTimeout = setTimeout(() => {
                if (status === Status.waiting) {
                    status = Status.ready;
                    canSolve = true;
                }
            }, $settings.timer.timeout * 1000);
        } else if (status === Status.timing) {
            status = Status.completed;
            canSolve = false;
            stopTimer();
            scrambles.update(s => [...s, currentScramble]);
            currentScramble = await randomScrambleForEvent("222");
            scramble.set(currentScramble);
        }
    }

    function handleUp() {
        if (status === Status.ready) {
            status = Status.timing;
            startTimer();
        } else if (status === Status.waiting) {
            if (!canSolve) {
                status = Status.idle;
                formattedTime = "00.00";
                clearTimeout(waitingTimeout);
                return;
            }
            formattedTime = "00.00";
            status = Status.timing;
            startTimer();
        } else if (status === Status.completed) {
            status = Status.idle;
        }
    }

    function startTimer() {
        const startTime = Date.now(); 
        timerInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            const milliseconds = Math.floor((elapsedTime % 1000) / 10); // Convert to 10 milliseconds accuracy

            const hoursStr = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
            const minutesStr = minutes > 0 || hours > 0 ? `${minutes.toString().padStart(2, '0')}:` : '';
            const secondsStr = seconds.toString().padStart(2, '0');
            const millisecondsStr = milliseconds.toString().padStart(2, '0');

            formattedTime = `${hoursStr}${minutesStr}${secondsStr}.${millisecondsStr}`;
        }, 10);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.focus();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    });

    onMount(() => {
        theme.set(getTheme() as Theme);
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="w-screen h-screen select-none flex flex-col flex-grow flex-[0.85] gap-4 justify-center items-center" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} on:mousedown|preventDefault on:mouseup|stopPropagation  bind:this={timer}>
    <p class={`font-reddit-mono font-normal text-8xl md:text-10xl ${
        css({
            color: (status === Status.idle) ? $theme.colors.timer.idle : (status === Status.waiting) ? $theme.colors.timer.waiting : (status === Status.ready) ? $theme.colors.timer.ready : $theme.colors.timer.timing
        })
    }`} on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
        {formattedTime}
    </p>

    <div class="flex flex-row gap-4 md:hidden">
        <button class={`min-w-8 font-space-grotesk font-normal text-2xl px-4 py-2 rounded-lg ${
            css({
                color: $theme.colors.text.primary,
            })
        }`} on:click={() => {
            if (status === Status.timing) {
                status = Status.idle;
                formattedTime = "00.00";
                stopTimer();
            }
        }}>
            +2
        </button>

        <button class={`min-w-8 font-space-grotesk font-normal text-2xl px-4 py-2 rounded-lg ${
            css({
                color: $theme.colors.text.primary,
            })
        }`} on:click={() => {
            if (status === Status.timing) {
                status = Status.idle;
                formattedTime = "00.00";
                stopTimer();
            }
        }}>
            DNF
        </button>
    </div>
</div>