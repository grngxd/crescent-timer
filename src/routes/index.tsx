import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TimerContext, { timerContextIds } from "~/common/context/TimerContext";
import MainTimer from "~/components/timer/MainTimer";

export default component$(() => {
  return (
    <>
    <TimerContext>
      <MainTimer context={timerContextIds.main} />
    </TimerContext>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};