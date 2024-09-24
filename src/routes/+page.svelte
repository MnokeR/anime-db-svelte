<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import type { AnimeShort } from "$lib/server/query-types";

  type MediaCategory = {
    media: AnimeShort[];
  };
  type PageData = {
    [key: string]: MediaCategory | undefined
  }
  export let data: PageData;

</script>

{#snippet category(cat: keyof PageData, title: string)}
  {#if data[cat]}
    <h1 class="text-center">{title}</h1>
    <div class="flex flex-wrap gap-3 justify-center">
    {#each data[cat].media as category}
      <AnimeCard data={category} />
    {/each}
  </div>
  {/if}
{/snippet}

<section class="max-w-[1440px] mx-auto">
  {@render category('trending', 'Trending')}
  {@render category('season', 'Season')}
  {@render category('nextSeason', 'Next Season')}
  {@render category('popular', 'Popular')}
  {@render category('top', 'Top Rated')}
</section>
