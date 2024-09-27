<script lang="ts">
  import AnimeCard from "$lib/components/AnimeCard.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { AnimeShort } from "$lib/server/query-types";
  import { fade, fly } from "svelte/transition";
  import RenderAnimes from "./components/render-animes.svelte";
  import RenderMangas from "./components/render-mangas.svelte";

  type MediaCategory = {
    media: AnimeShort[];
  };
  type HomePageProps = {
    [key: string]: MediaCategory | undefined;
  };

  let { data }: { data: HomePageProps } = $props();

  let mediaType = $state<"Anime" | "Manga">("Anime");

  const handleMediaType = (type: "Anime" | "Manga") => {
    mediaType = type;
  };
</script>

<section>
  <SelectMediaType mediaType={handleMediaType} />
  <Form />
</section>

<section class="max-w-[1440px] mx-auto overflow-hidden">
  {#key mediaType}
    <div
      in:fade={{ duration: 300, delay: 400 }}
      out:fly={{ x: 200, duration: 300 }}
    >
      {#if mediaType === "Anime"}
        <RenderAnimes {data} />
      {/if}
    </div>
    <div
      in:fade={{ duration: 300, delay: 400 }}
      out:fly={{ x: -200, duration: 300 }}
    >
      {#if mediaType === "Manga"}
        <RenderMangas {data} />
      {/if}
    </div>
  {/key}
</section>
