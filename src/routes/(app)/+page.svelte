<script lang="ts">
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { LayoutData } from "../$types";
  import RenderDefault from "./components/render-default.svelte";
  import { animeCategories } from "$lib/query";

  let { data }: { data: LayoutData } = $props();
</script>

<section>
  <SelectMediaType />
</section>

<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  <RenderDefault data={data.layoutData.anime!} categories={animeCategories} />
</section>
