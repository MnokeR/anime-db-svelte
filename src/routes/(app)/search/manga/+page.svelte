<script lang="ts">
  import type { PageData } from "../$types";
  import RenderPage from "../../components/render-page.svelte";

  let { data }: { data: PageData } = $props();
  const mediaType = "Manga";
</script>

<svelte:head>
  <title>Anime DB | Search Manga</title>
  <meta
    name="description"
    content="Discover new Mangas or search for your favorite!"
  />
</svelte:head>
<RenderPage {data} {mediaType} />
