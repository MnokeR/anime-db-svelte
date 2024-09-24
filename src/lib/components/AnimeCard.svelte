<script lang="ts">
  import type { AnimeShort } from "$lib/server/query-types";
  import Skeleton from "./ui/Skeleton.svelte";
  import { fade } from "svelte/transition";

  type AnimeCardProps = {
    data: AnimeShort;
  };

  let { data }: AnimeCardProps = $props();
  let imageLoaded = $state(false);

  const handleImageLoad = () => {
    imageLoaded = true;
  };
</script>

<div class="relative flex flex-col">
  {#if !imageLoaded}
    {#each Array(12) as _}
      <Skeleton
        onclick={handleImageLoad}
        class="absolute inset-0 w-full h-full"
      />
    {/each}
  {/if}

  <div class="flex w-[210px] h-[294px] items-center justify-center rounded-xl">
    <img
      class="rounded-xl w-[195px] h-[279px] object-cover"
      src={data.coverImage.large}
      alt={`Cover for ${data.title.userPreferred}`}
      width={195}
      height={279}
      onload={handleImageLoad}
      in:fade={{ duration: 300 }}
      style="opacity: {imageLoaded ? 1 : 0};"
    />
  </div>
  <p class="max-w-[210px] truncate text-sm text-center">
    {data.title.userPreferred}
  </p>
</div>
