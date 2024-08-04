/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ContextId, Signal } from "@builder.io/qwik";
import { $, component$, useContext, useOnWindow, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { startTimer, stopTimer, updateFormattedTime } from "~/common/misc/timer";

interface Props {
    context: ContextId<Signal<number>>;
}

enum TimerState {
    IDLE,
    WAITING,
    READY,
    TIMING,
    COMPLETED
}

export default component$((props: Props) => {
    const timerElement = useSignal<HTMLDivElement>();
    const timer = useContext(props.context);
    const formattedTimer = useSignal<string>("0.00");
    const state = useSignal(TimerState.IDLE);
    const timing = useSignal(false);
    const timerInterval = useSignal<{ id: number | null }>({ id: null });

    useVisibleTask$(({ track }) => {
        track(() => timer.value);
        console.log("Timer value: ", timer.value);
        formattedTimer.value = updateFormattedTime(timer.value);
        console.log("formattedTimer value: ", formattedTimer.value);
    });

    const getTimerColor = () => {
        switch (state.value) {
            case TimerState.IDLE:
                return "text-gray-500";
            case TimerState.WAITING:
                return "text-red-500";
            case TimerState.READY:
                return "text-green-500";
            case TimerState.TIMING:
                return "text-blue-500";
            case TimerState.COMPLETED:
                return "text-gray-500";
        }
    };

    const onDown = $(() => {
        switch (state.value) {
            case TimerState.IDLE:
                state.value = TimerState.WAITING;
                new Promise((resolve) => setTimeout(resolve, 350)).then(() => {
                    if (state.value === TimerState.WAITING) {
                        state.value = TimerState.READY;
                    }
                });
                break;
            case TimerState.TIMING:
                state.value = TimerState.COMPLETED;
                stopTimer(timing, timerInterval);
                break;
        }
    });

    const onUp = $(() => {
        switch (state.value) {
            case TimerState.READY:
                state.value = TimerState.TIMING;
                startTimer(timer, timing, timerInterval);
                break;
            case TimerState.WAITING:
                state.value = TimerState.IDLE;
                break;
            default:
                state.value = TimerState.IDLE;
                break;
        }
    });

    useOnWindow("keydown", $((e: KeyboardEvent) => {
        if (!timerElement.value?.contains(e.target as Node)) return;
        if (e.key === " ") onDown();
    }));

    useOnWindow("keyup", $((e: KeyboardEvent) => {
        if (!timerElement.value?.contains(e.target as Node)) return;
        if (e.key === " ") onUp();
    }));

    const onPointerDown = $((e: PointerEvent) => {
        onDown();
    });

    const onPointerUp = $((e: PointerEvent) => {
        onUp();
    });

    const onTouchStart = $((e: TouchEvent) => {
        onDown();
    });

    const onTouchEnd = $((e: TouchEvent) => {
        onUp();
    });

    return (
        <div ref={timerElement}>
            <div class={`font-mono text-7xl !select-none ${getTimerColor()}`}
                tabIndex={0}
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