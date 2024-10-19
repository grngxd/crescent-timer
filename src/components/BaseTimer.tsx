// src/components/timer/BaseTimer.tsx
import type { ContextId, Signal } from "@builder.io/qwik";
import { $, useContext, useOnDocument, useOnWindow, useSignal, useTask$ } from "@builder.io/qwik";
import shortUUID from "short-uuid";
import { startTimer, stopTimer, updateFormattedTime } from "~/common/misc/timer";

export interface Props {
    context: ContextId<Signal<number>>;
    timeout?: number;
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
    const times = useSignal<{
        formatted: string;
        time: number;
        id: string;
        timestamp: number;
    }[]>([]);
    const state = useSignal(TimerState.IDLE);
    const timing = useSignal(false);
    const timerInterval = useSignal<{ id: number | null }>({ id: null });

    useTask$(({ track }) => {
        track(() => timer.value);
        formattedTimer.value = updateFormattedTime(timer.value);
    });

    const onDown = $((e: KeyboardEvent | PointerEvent | TouchEvent) => {
        if (!timerElementContainer.value?.contains(e.target as Node)) return;
        switch (state.value) {
            case TimerState.IDLE:
                state.value = TimerState.WAITING;
                new Promise((resolve) => setTimeout(resolve, props.timeout ?? 350)).then(() => {
                    if (state.value === TimerState.WAITING) {
                        state.value = TimerState.READY;
                    }
                });
                break;
            case TimerState.TIMING:
                state.value = TimerState.COMPLETED;
                stopTimer(timing, timerInterval);

                times.value = [...times.value, {
                    formatted: formattedTimer.value,
                    time: timer.value,
                    id: shortUUID.generate(),
                    timestamp: Date.now()
                }];
                break;
        }
    });

    const onUp = $((e: KeyboardEvent | PointerEvent | TouchEvent) => {
        
        if (!timerElementContainer.value?.contains(e.target as Node)) return;
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
        if (e.key === " ") onDown(e);
    }));

    useOnWindow("keyup", $((e: KeyboardEvent) => {
        if (e.key === " ") onUp(e);
    }));

    const onPointerDown = $((e: PointerEvent) => {
        onDown(e);
    });

    const onPointerUp = $((e: PointerEvent) => {
        onUp(e);
    });

    const onTouchStart = $((e: TouchEvent) => {
        onDown(e);
    });

    const onTouchEnd = $((e: TouchEvent) => {
        onUp(e);
    });

    useOnDocument("pointerdown", onPointerDown);
    useOnDocument("pointerup", onPointerUp);
    useOnDocument("touchstart", onTouchStart);
    useOnDocument("touchend", onTouchEnd);

    return {
        timerElementContainer,
        formattedTimer,
        state,
        times,
        onPointerDown,
        onPointerUp,
        onTouchStart,
        onTouchEnd,
        getTimerColor
    };
};