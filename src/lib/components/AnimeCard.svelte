<script lang="ts">
  import type { AnimeShort } from "$lib/types/types";
  import Skeleton from "./ui/Skeleton.svelte";
  import { scale } from "svelte/transition";

  let { data }: { data: AnimeShort } = $props();
  let imageLoaded = $state(false);

  const handleImageLoad = () => {
    imageLoaded = true;
  };
</script>

<div class="flex flex-col">
  <div
    class="relative flex w-[130px] h-[182px] lg:w-[157px] lg:h-[216px] xl:w-[200px] xl:h-[280px] justify-center rounded-xl"
  >
    {#if !imageLoaded}
      <div>
        <Skeleton class="absolute inset-0 -z-10 w-full h-full" />
      </div>
    {/if}
    {#key imageLoaded}
      <img
        class="rounded-xl w-full h-full object-cover transition-all"
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
      class="w-[130px] lg:w-[157px] xl:w-[200px] line-clamp-2 text-xs md:text-sm pt-2 px-2 opacity-80"
    >
      {data.title.userPreferred}
    </p>
  {/if}
</div>
