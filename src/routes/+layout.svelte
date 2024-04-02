<script lang="ts">
    import { defaultTheme, getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import { onMount } from "svelte";
    import "../app.pcss";
    let loaded = false;
    let theme: typeof defaultTheme = defaultTheme;

    onMount(() => {
        theme = getTheme();
        console.log(theme);
        loaded = true;
    })
</script>

<div class={`flex h-screen flex-1 flex-grow w-full ${
    css({
        backgroundColor: theme.background
    })
}`}>
    <slot/>
</div>