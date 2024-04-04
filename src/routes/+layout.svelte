<script lang="ts">
    import { getSettings } from "$lib/settings";
    import { loading } from "$lib/stores/misc";
    import { settings } from "$lib/stores/settings";
    import { theme } from "$lib/stores/theme";
    import { getTheme } from "$lib/theme";
    import { css } from "@emotion/css";
    import { onMount } from "svelte";
    import "../app.pcss";
    import Loading from "../components/Loading.svelte";
    import Navbar from "../components/Navbar.svelte";
    import { supabase } from "../db.server";
    onMount(() => {
        settings.set(getSettings());
        theme.set(getTheme());
        
        loading.set(false);
        
        supabase.from("test").select("*").then((data) => {
            console.log(data);
        });
    })
</script>

<div class={`!select-none flex flex-col h-screen flex-1 flex-grow w-full ${
    css({
        backgroundColor: $theme.background,
    })
}`}>
    <div class="flex flex-col h-screen">
        <Loading />
        <slot/>
        <Navbar />
    </div>
</div>