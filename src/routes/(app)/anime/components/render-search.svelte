<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import type { SearchResults } from "$lib/server/query-types";

  let { data }: { data: SearchResults } = $props();
</script>

{#each data?.media as anime}
  <AnimeCard data={anime} />
{/each}
