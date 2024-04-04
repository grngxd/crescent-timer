<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "../components/Navbar.svelte";
  import Timer from "../components/Timer.svelte";
  import { supabase } from "../db.server";

          
  onMount(async () => {
    // show all of the tables in the database
   
    let { data: info, error } = await supabase
      .from('info')
      .select('*')
    
    console.log(info)
  })
</script>

<Navbar />
<Timer />