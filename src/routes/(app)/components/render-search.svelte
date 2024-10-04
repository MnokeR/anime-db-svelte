<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import type { SearchResults } from "$lib/types/types";

  let { data }: { data: SearchResults } = $props();
</script>

{#each data?.media as media}
  <AnimeCard data={media} />
{/each}
