<script lang="ts">
  import RenderDefault from "./components/render-default.svelte";
  import { animeCategories } from "$lib/client/query";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Anime DB Svelte</title>
  <meta name="description" content="Anime DB build using Svelte" />
  <link rel="preload" href="/images/herobg.webp" as="image" />
</svelte:head>

<section class="flex justify-center">
  <img
    class="h-[400px] sm:h-[500px] object-cover"
    alt="Hero BG"
    src="/images/hero-bg"
    srcset="
    /images/hero-sm.webp 640w, 
    /images/hero-md.webp 768w,
    /images/hero-lg.webp 1024w,
    /images/herobg.webp 1200w,
    "
    sizes="(min-width: 1025px) 1200px, 100vw"
    width='1200'
    height='500'
  />
</section>

<section
  class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10"
>
  <RenderDefault data={data.layoutData.anime!} categories={animeCategories} />
</section>
