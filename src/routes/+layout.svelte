<script lang="ts">
    import { theme } from "$lib/stores/theme";
    import { getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import { onMount } from "svelte";
    import "../app.pcss";
    import { supabase } from "../db.server";
    let loaded = false;

    onMount(() => {
        theme.set(getTheme());
        loaded = true;
        console.log("a")
        supabase.from("test").select("*").then(console.log)
    })
</script>

<div class={`flex flex-col h-screen flex-1 flex-grow w-full ${
    css({
        backgroundColor: $theme.background,
    })
}`}>
    <slot/>
</div>