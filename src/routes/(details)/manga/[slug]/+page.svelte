<script lang="ts">
  import { Loader } from "lucide-svelte";
  import type { LayoutData } from "../../$types";

  let { data }: { data: LayoutData } = $props();
</script>

{#await data.details}
  <Loader class="animate-spin" />
{:then details}
  {console.log(details)}
  <!-- <img src={details.data.Media.bannerImage} alt="Banner" /> -->
{/await}
