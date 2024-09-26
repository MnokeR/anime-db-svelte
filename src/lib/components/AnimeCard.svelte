<script lang="ts">
  import type { AnimeShort } from "$lib/server/query-types";
  import { onMount } from "svelte";
  import Skeleton from "./ui/Skeleton.svelte";
  import { fade } from "svelte/transition";

  type AnimeCardProps = {
    data: AnimeShort;
  };

  let { data }: AnimeCardProps = $props();
  let transition = $state(false);

  onMount(() => {
    transition = true;
  });
</script>

<div class="flex flex-col">
  <div
    class="relative flex w-[210px] h-[294px] items-center justify-center rounded-xl overflow-hidden"
  >
    {#if !transition}
      <div out:fade={{ duration: 200 }}>
        <Skeleton class="absolute inset-0 -z-10 w-full h-full" />
      </div>
    {/if}
    {#if transition}
      <img
        class="rounded-xl w-full h-full object-cover"
        src={data.coverImage.large}
        alt={`Cover for ${data.title.userPreferred}`}
        width={195}
        height={279}
        in:fade={{ duration: 200 }}
      />
    {/if}
  </div>
  {#if transition}
    <p class="max-w-[210px] truncate text-sm text-center">
      {data.title.userPreferred}
    </p>
  {/if}
</div>
