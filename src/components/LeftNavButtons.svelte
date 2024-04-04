<script>

  import { theme } from "$lib/stores/theme";
  import { css } from "@emotion/css";
  import GraphDownLineDuotone from "./icons/solar/GraphDownLineDuotone.svelte";
  import SettingsLinear from "./icons/solar/SettingsLinear.svelte";
  import UserCircleLinear from "./icons/solar/UserCircleLinear.svelte";

</script>
<div class="hidden md:flex flex-row gap-4">
    <button class={`w-12 h-12 flex items-center justify-center font-space-grotesk font-light text-2xl rounded-full duration-200 transition-all active:scale-125 ${
        css({
          color: $theme.colors.text.primary,
          ":hover": {
            backgroundColor: `${$theme.colors.text.secondary}55`
          }
        })
      }`}><UserCircleLinear /></button>

    <button class={`text-[3rem] w-12 h-12 flex items-center justify-center font-space-grotesk font-light text-2xl rounded-full duration-200 transition-all active:scale-125 ${
        css({
        color: $theme.colors.text.primary,
        ":hover": {
            backgroundColor: `${$theme.colors.text.secondary}55`
        }
        })
    }`}><GraphDownLineDuotone /></button>

    <button class={`w-12 h-12 flex items-center justify-center font-space-grotesk font-light text-2xl rounded-full duration-200 transition-all active:scale-125 ${
        css({
        color: $theme.colors.text.primary,
        ":hover": {
            backgroundColor: `${$theme.colors.text.secondary}55`
        }
        })
    }`}><SettingsLinear /></button>
</div>