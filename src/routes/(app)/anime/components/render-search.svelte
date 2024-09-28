<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import type { SearchResults } from "$lib/server/query-types";

  let { data }: { data: SearchResults } = $props();
</script>

<h1 class="text-center">Search</h1>
<div class="flex flex-wrap gap-3 justify-center">
  {#each data.media as anime}
    <AnimeCard data={anime} />
  {/each}
</div>
