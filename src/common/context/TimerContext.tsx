/* eslint-disable qwik/use-method-usage */
import type { ContextId, Signal } from "@builder.io/qwik";
import { component$, createContextId, Slot, useContextProvider, useSignal } from "@builder.io/qwik";

export const TimerContexts: Record<string, ContextId<Signal<number>>> = {
    MainTimer: createContextId<Signal<number>>("timers.main")
  };
  
  export default component$(() => {
    const signals: Record<string, Signal<number>> = {};

    for (const [key] of Object.entries(TimerContexts)) {
        signals[key] = useSignal(0);
        useContextProvider(TimerContexts[key], signals[key]);
    }
  
    return (
        <Slot />
    );
  });