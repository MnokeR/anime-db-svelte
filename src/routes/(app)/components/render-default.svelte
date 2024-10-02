<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import type { AnimeShort } from "$lib/server/query-types";
  type MediaCategory = {
    media: AnimeShort[];
  };
  type HomePageProps = {
    [key: string]: MediaCategory | undefined;
  };
  type CategoryType = {
    label: string;
    value: keyof HomePageProps;
  }[];

  let { data, categories }: { data: HomePageProps; categories: CategoryType } =
    $props();
</script>

{#each categories as category}
  {#if data[category.value]}
    <h1 class="py-4 font-semibold text-lg text-muted-foreground pl-5">
      {category.label}
    </h1>
    <div class="flex flex-wrap justify-center gap-3">
      {#each data[category.value]?.media || [] as media}
        <AnimeCard data={media} />
      {/each}
    </div>
  {/if}
{/each}
