<script lang="ts">
  import type { PageData } from "../$types";
  import RenderPage from "../../components/render-page.svelte";

  let { data }: { data: PageData } = $props();
  console.log(data);
  const mediaType = "Anime";
</script>

<svelte:head>
  <title>Anime DB | Search Anime</title>
  <meta
    name="description"
    content="Discover new Animes or search for your favorite!"
  />
</svelte:head>
<RenderPage {data} {mediaType} />
