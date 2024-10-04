<script lang="ts">
  import type { LayoutData } from "../$types";
  import RenderDefault from "./components/render-default.svelte";
  import { animeCategories } from "$lib/client/query";

  let { data }: { data: LayoutData } = $props();
</script>

<svelte:head>
  <title>Anime DB Svelte</title>
  <meta name="description" content="Anime DB build using Svelte" />
</svelte:head>

<section class="flex justify-center">
  <img
    class="h-[469px] object-cover"
    src="/images/herobg.webp"
    alt="Hero BG"
    width={1200}
    height={469}
  />
</section>

<section
  class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10"
>
  <RenderDefault data={data.layoutData.anime!} categories={animeCategories} />
</section>
