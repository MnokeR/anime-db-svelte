<script lang="ts">
  import { animeInfoList } from "$lib/client/utils";
  import type { MediaDetails } from "$lib/types/details";
  let { media }: { media: MediaDetails } = $props();
  const animeInfo = animeInfoList(media)
  console.log(media)
</script>
{#snippet info(title: string , data: string | number)}
  {#if data}
    <div>
      <h3 class="font-semibold">{title}</h3>
      <p class="text-sm">{data}</p>
    </div>
  {/if}
{/snippet}

<section class="mx-auto max-w-screen-2xl mb-10">
  <div class="flex gap-4">
    <div class="w-[256px] flex flex-col gap-2 text-muted-foreground bg-secondary p-4">
      {#each animeInfo as list}
        {@render info(list.label, list.info)}
      {/each}
    </div>
    <div class="flex-1 p-4 bg-secondary">
      <h2 class="text-muted-foreground font-semibold">Main Cast</h2>
        <div class="flex flex-wrap gap-4">
          {#each media.characterPreview.edges as edge}
            <img src={edge.node.image.large} alt={edge.node.name.userPreferred} loading="lazy" width="230" height="345" class="w-[120px] h-[180px]">
          {/each}
      </div>
    </div>
  </div>
</section>
