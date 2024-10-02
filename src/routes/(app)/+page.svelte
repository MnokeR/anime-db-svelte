<script lang="ts">
  import type { LayoutData } from "../$types";
  import RenderDefault from "./components/render-default.svelte";
  import { animeCategories } from "$lib/query";

  let { data }: { data: LayoutData } = $props();
</script>

<section class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10">
  <RenderDefault data={data.layoutData.anime!} categories={animeCategories} />
</section>
