// src/components/timer/BaseTimer.tsx
import type { ContextId, Signal } from "@builder.io/qwik";
import { $, useContext, useOnWindow, useSignal, useTask$ } from "@builder.io/qwik";
import { startTimer, stopTimer, updateFormattedTime } from "~/common/misc/timer";

export interface Props {
    context: ContextId<Signal<number>>;
}

export enum TimerState {
    IDLE = "IDLE",
    WAITING = "WAITING",
    READY = "READY",
    TIMING = "TIMING",
    COMPLETED = "COMPLETED"
}

export const useBaseTimer = (props: Props) => {
    const timerElementContainer = useSignal<HTMLDivElement>();
    const timer = useContext(props.context);
    const formattedTimer = useSignal<string>("0.00");
    const state = useSignal(TimerState.IDLE);
    const timing = useSignal(false);
    const timerInterval = useSignal<{ id: number | null }>({ id: null });

    useTask$(({ track }) => {
        track(() => timer.value);
        formattedTimer.value = updateFormattedTime(timer.value);
    });

    const onDown = $(() => {
        console.log("document.activeElement", document.activeElement);
        console.log("timerElementContainer", timerElementContainer.value);
        console.log("document.activeElement?.contains(timerElementContainer.value as Node | null)", document.activeElement?.contains(timerElementContainer.value as Node | null));
        if (!document.activeElement?.contains(timerElementContainer.value as Node | null)) return;
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
        if (!document.activeElement?.contains(timerElementContainer.value as Node | null)) return;
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

    const timerColor = useSignal<string>("text-gray-500");

    const getTimerColor = $(() => {
        switch (state.value) {
            case TimerState.IDLE:
                timerColor.value = "text-gray-500";
                break;
            case TimerState.WAITING:
                timerColor.value = "text-red-500";
                break;
            case TimerState.READY:
                timerColor.value = "text-green-500";
                break;
            case TimerState.TIMING:
                timerColor.value = "text-blue-500";
                break;
            case TimerState.COMPLETED:
                timerColor.value = "text-gray-500";
                break;
        }

        return timerColor;
    });

    useOnWindow("keydown", $((e: KeyboardEvent) => {
        if (e.key === " ") onDown();
    }));

    useOnWindow("keyup", $((e: KeyboardEvent) => {
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

    return {
        timerElementContainer,
        formattedTimer,
        state,
        onPointerDown,
        onPointerUp,
        onTouchStart,
        onTouchEnd,
        getTimerColor
    };
};