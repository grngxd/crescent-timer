<script lang="ts">
    import { theme } from "$lib/stores/theme";
    import { getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import { onMount } from "svelte";
    import "../app.pcss";
    let loaded = false;

    onMount(() => {
        theme.set(getTheme());
        console.log(theme);
        loaded = true;
    })
</script>

<div class={`flex h-screen flex-1 flex-grow w-full ${
    css({
        backgroundColor: $theme.background
    })
}`}>
    <slot/>
</div>