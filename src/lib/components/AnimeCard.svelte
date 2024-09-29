<script lang="ts">
  import type { AnimeShort } from "$lib/server/query-types";
  import Skeleton from "./ui/Skeleton.svelte";
  import { scale } from "svelte/transition";

  type AnimeCardProps = {
    data: AnimeShort;
  };

  let { data }: AnimeCardProps = $props();
  let imageLoaded = $state(false);

  const handleImageLoad = () => {
    imageLoaded = true;
  };
</script>

<div class="flex flex-col">
  <div
    class="relative flex w-[210px] h-[294px] items-center justify-center rounded-xl overflow-hidden"
  >
    {#if !imageLoaded}
      <div>
        <Skeleton class="absolute inset-0 -z-10 w-full h-full" />
      </div>
    {/if}
    {#key imageLoaded}
      <img
        class="rounded-xl w-full h-full object-cover"
        src={data.coverImage.large}
        alt={`Cover for ${data.title.userPreferred}`}
        width={195}
        height={279}
        onload={handleImageLoad}
        style="visibility: {imageLoaded ? 'visible' : 'hidden'};"
        in:scale={{ duration: 300 }}
      />
    {/key}
  </div>
  {#if imageLoaded}
    <p class="max-w-[210px] truncate text-sm text-center">
      {data.title.userPreferred}
    </p>
  {/if}
</div>
