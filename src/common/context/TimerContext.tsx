/* eslint-disable qwik/use-method-usage */
import type { ContextId, Signal } from "@builder.io/qwik";
import { component$, createContextId, Slot, useContextProvider, useSignal } from "@builder.io/qwik";

export const timerContextIds: Record<string, ContextId<Signal<number>>> = {
    main: createContextId<Signal<number>>("timer.main")
  };
  
  export default component$(() => {
    const signals: Record<string, Signal<number>> = {};

    for (const [key] of Object.entries(timerContextIds)) {
        signals[key] = useSignal(0);
        useContextProvider(timerContextIds[key], signals[key]);
    }
  
    return (
        <Slot />
    );
  });