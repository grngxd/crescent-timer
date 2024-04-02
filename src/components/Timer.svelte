<script lang="ts">
    enum Status {
        idle = "idle",
        ready = "ready",
        timing = "timing",
    }

    let status = Status.idle;

    let formattedTime = "00.00";
    let timerInterval: NodeJS.Timeout | undefined;


    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            if (status === Status.idle) {
                status = Status.ready;
                formattedTime = "00.00";
            }
        }
    }

    function handleKeyUp(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            if (status === Status.ready) {
                status = Status.timing;
                startTimer();
            } else if (status === Status.timing) {
                status = Status.idle;
                stopTimer();
            }
        }
    }

    function handleMouseDown() {
        if (status === Status.idle) {
            status = Status.ready;
            formattedTime = "00.00";
        } else if (status === Status.timing) {
            status = Status.idle;
            stopTimer();
        }
    }

    function handleMouseUp() {
        if (status === Status.ready) {
            status = Status.timing;
            startTimer();
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

    import { defaultTheme, getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import { onMount } from 'svelte';

    let theme: typeof defaultTheme = defaultTheme;

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
        theme = getTheme() as typeof defaultTheme;
    });

    const dev = process.env.NODE_ENV === 'development';
</script>

<div class="flex flex-col" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
    {#if dev}
        <p class="font-space-grotesk font-semibold text-2xl">debug: {status}</p>
    {/if}
    <p class={`font-reddit-mono font-semibold text-3xl ${
        css({
            color: (status === Status.idle) ? theme.colors.timer.idle : (status === Status.ready) ? theme.colors.timer.ready : theme.colors.timer.timing
        })
    }`}>
        {formattedTime}
    </p>
</div>