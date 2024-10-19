// src/components/timer/MainTimer.tsx
import { $, component$, useOnDocument, useSignal, useTask$ } from "@builder.io/qwik";
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
        getTimerColor
    } = useBaseTimer(props);
    const timerColor = useSignal<string>("");

    useTask$(async ({ track }) => {
        timerColor.value = await track(async () => (await getTimerColor()).value);
    })


    useOnDocument("DOMContentLoaded", $((e) => {
        e.preventDefault();
        console.log("timerElementContainer", timerElementContainer.value);
        timerElementContainer.value!.focus({
            focusVisible: false
        });
        console.log("document.activeElement", document.activeElement);
    }))
    
    return (
        <div ref={timerElementContainer} tabIndex={1}>
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