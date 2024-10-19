// src/components/timer/MainTimer.tsx
import { component$, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import type { Props } from "../BaseTimer";
import { useBaseTimer } from "../BaseTimer";

export default component$((props: Props) => {
    const {
        timerElementContainer,
        formattedTimer,
        state,
        onPointerDown,
        onPointerUp,
        onTouchStart,
        onTouchEnd,
        getTimerColor,
        times
    } = useBaseTimer({
        ...props,
        timeout: 350
    });
    const timerColor = useSignal<string>("");

    useTask$(async ({ track }) => {
        timerColor.value = await track(async () => (await getTimerColor()).value);
    })

    useVisibleTask$(() => {
        const storedTimes = window.localStorage.getItem("times.main") ?? "[]";
        
        if (JSON.parse(storedTimes).length > 0) {
            times.value = JSON.parse(storedTimes);
        } else {
            times.value = [];
            window.localStorage.setItem("times.main", "[]");
        }
    })

    useVisibleTask$(({ track }) => {
        track(() => times.value);
        console.log("mainTimer.times", times.value);
        window.localStorage.setItem("times.main", JSON.stringify(times.value));
    });
    
    return (
        <div ref={timerElementContainer} tabIndex={-1} class="w-screen h-screen flex absolute justify-center items-center overflow-hidden">
            <div class={`p-16 rounded-lg font-mono text-8xl !select-none ${timerColor.value}`}
                onPointerDown$={onPointerDown}
                onPointerUp$={onPointerUp}
                onTouchStart$={onTouchStart}
                onTouchEnd$={onTouchEnd}
            >
                {formattedTimer.value}
            </div>
        </div>
    );
});