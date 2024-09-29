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
    class="relative flex w-[140px] h-[210px] md:w-[210px] md:h-[294px] items-center justify-center rounded-xl overflow-hidden"
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
    <p
      class="w-[140px] md:w-[210px] line-clamp-2 text-xs md:text-sm m-2 opacity-80"
    >
      {data.title.userPreferred}
    </p>
  {/if}
</div>
