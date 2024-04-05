<script>
  import { css } from "@emotion/css";


    import { settings } from "$lib/stores/settings";
    import { theme } from "$lib/stores/theme";
    import ArrowRightBold from "./icons/solar/ArrowRightBold.svelte";
  
  </script>
  <div class="hidden lg:flex flex-row gap-3 items-center">
      <ArrowRightBold class={`w-6 h-6 ${css({
        color: `${$theme.colors.text.primary}55`
      })}`} />

      <p class={`font-space-grotesk font-light text-2xl ${css({
        color: $theme.colors.text.primary
      })}`}>
        {$settings.sessions.sessions[$settings.sessions.current].name}
      </p>

      <p class={`font-space-grotesk font-light text-lg ${css({
        color: `${$theme.colors.text.primary}55`
      })}`}>
        <!-- it is like "222", make it "2x2x2" -->
        {$settings.sessions.sessions[$settings.sessions.current].cube.split("").join("x")}
      </p>
  </div>