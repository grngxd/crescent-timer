<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
</script>
<div class={`text-center z-[2] flex-row md:px-32 justify-center items-center flex-[0.15] backdrop-blur-lg flex md:hidden ${css({
    backgroundColor: `${$theme.background}22`,
    color: $theme.colors.text.primary
})}`}>
<button class={`text-2xl md:text-3xl font-bold flex w-full h-full justify-center items-center ${css({
    backgroundColor: `${$theme.colors.text.tertiary}11`
})}`}>A</button>
<button class={`text-2xl md:text-3xl font-bold flex w-full h-full justify-center items-center ${css({
    backgroundColor: `${$theme.colors.text.tertiary}11`
})}`}>B</button>
<button class={`text-2xl md:text-3xl font-bold flex w-full h-full justify-center items-center ${css({
    backgroundColor: `${$theme.colors.text.tertiary}11`
})}`}>C</button>
<button class={`text-2xl md:text-3xl font-bold flex w-full h-full justify-center items-center ${css({
    backgroundColor: `${$theme.colors.text.tertiary}11`
})}`}>D</button>
<button class={`text-2xl md:text-3xl font-bold flex w-full h-full justify-center items-center ${css({
    backgroundColor: `${$theme.colors.text.tertiary}11`
})}`}>E</button>
</div>