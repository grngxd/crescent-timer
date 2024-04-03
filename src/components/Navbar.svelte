<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import GraphDownLineDuotone from "./icons/solar/GraphDownLineDuotone.svelte";
  import StopwatchLinear from "./icons/solar/StopwatchLinear.svelte";
  import UserCircleLinear from "./icons/solar/UserCircleLinear.svelte";
</script>
<div class={`text-center z-[2] flex-row md:px-32 justify-center items-center flex-[0.1] backdrop-blur-lg flex md:hidden ${css({
    backgroundColor: `${$theme.background}22`,
    color: $theme.colors.text.primary
})}`}>
<button class={`text-3xl md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
    backgroundColor: `${$theme.colors.text.tertiary}05`,
    ":hover": {
        backgroundColor: `${$theme.colors.text.tertiary}11`
    }
})}`}>
    <StopwatchLinear />
</button>
<button class={`text-[4rem] md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
    backgroundColor: `${$theme.colors.text.tertiary}05`,
    ":hover": {
        backgroundColor: `${$theme.colors.text.tertiary}11`
    }
})}`}>
    <GraphDownLineDuotone />
</button>
<button class={`text-3xl md:text-3xl font-bold flex w-full h-full justify-center items-center transition-all duration-200 ${css({
    backgroundColor: `${$theme.colors.text.tertiary}05`,
    ":hover": {
        backgroundColor: `${$theme.colors.text.tertiary}11`
    }
})}`}>
    <UserCircleLinear />
</button>
</div>