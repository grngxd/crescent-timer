import { Signal } from "@builder.io/qwik";

export const updateFormattedTime = (currentTime: number): string => {
    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10); // Convert to 10 milliseconds accuracy

    const formattedSeconds = seconds.toString();
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

    let newFormattedTime = "";
    if (currentTime < 10000) {
        newFormattedTime = `${formattedSeconds}.${formattedMilliseconds}`;
    } else if (currentTime < 60000) {
        newFormattedTime = `${formattedSeconds.padStart(2, '0')}.${formattedMilliseconds}`;
    } else {
        const minutesStr = minutes > 0 || hours > 0 ? `${minutes.toString().padStart(2, '0')}:` : '';
        const secondsStr = seconds.toString().padStart(2, '0');
        newFormattedTime = `${minutesStr}${secondsStr}.${formattedMilliseconds}`;
    }

    return newFormattedTime;
};

export const startTimer = (timer: Signal<number>, timing: Signal<boolean>, timerInterval: Signal<{ id: number | null }> ) => {
    timing.value = true;
    const startTime = Date.now(); 

    const update = () => {
        if (!timing.value) return;
        timer.value = Date.now() - startTime;
        timerInterval.value.id = requestAnimationFrame(update);
    };

    timerInterval.value.id = requestAnimationFrame(update);
}

export const stopTimer = (timing: Signal<boolean>, timerInterval: Signal<{ id: number | null }>) => {
    timing.value = false;
    if (timerInterval.value.id !== null) {
        cancelAnimationFrame(timerInterval.value.id);
        timerInterval.value.id = null;
    }
}

export const resetTimer = (timer: Signal<number>) => {
    timer.value = 0;
}