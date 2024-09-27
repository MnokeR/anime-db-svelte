<script lang='ts'>
  import AnimeCard from '$lib/components/AnimeCard.svelte';
  import type { AnimeShort } from '$lib/server/query-types';
  import { fly } from 'svelte/transition';
  type MediaCategory = {
    media: AnimeShort[];
  };
  type HomePageProps = {
    [key: string]: MediaCategory | undefined;
  };
  let {data}: {data: HomePageProps} = $props()
</script>

{#snippet category(cat: keyof HomePageProps, title: string)}
  {#if data[cat]}
    <h1 class="text-center">{title}</h1>
    <div class="flex flex-wrap gap-3 justify-center">
    {#each data[cat].media as category}
      <AnimeCard data={category} />
    {/each}
  </div>
  {/if}
{/snippet}

<div 
  in:fly={{ x: 1000, duration: 200, delay: 300 }} 
  out:fly={{ x: 1000, duration: 200 }}>
  {@render category('trending', 'Trending')}
  {@render category('manhwa', 'Manhwa')}
  {@render category('popular', 'Popular')}
  {@render category('top', 'Top Rated')}
</div>