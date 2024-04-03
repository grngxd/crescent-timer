<script lang="ts">
  import { scramble } from "$lib/stores/scramble";
  import { theme } from "$lib/stores/theme";

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
            handleDown();
        }
    }

    function handleKeyUp(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            handleUp();
        }
    }

    async function handleDown() {
        if (status === Status.idle) {
            status = Status.ready;
            formattedTime = "00.00";
        } else if (status === Status.timing) {
            status = Status.idle;
            stopTimer();
            scramble.set(await randomScrambleForEvent("333"));
        }
    }

    function handleUp() {
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
    import { randomScrambleForEvent } from "cubing/scramble";
    import { onMount } from 'svelte';

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
        theme.set(getTheme() as typeof defaultTheme);
    });

    const dev = process.env.NODE_ENV === 'development';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="absolute w-screen h-screen select-none flex flex-col flex-grow justify-center items-center" on:mousedown={handleDown} on:mouseup={handleUp}>
    <p class={`font-reddit-mono font-semibold text-10xl ${
        css({
            color: (status === Status.idle) ? $theme.colors.timer.idle : (status === Status.ready) ? $theme.colors.timer.ready : $theme.colors.timer.timing
        })
    }`}>
        {formattedTime}
    </p>
</div>