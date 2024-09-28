<script lang="ts">
  import RenderAnimes from "./anime/components/render-animes.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { LayoutData } from "../$types";

  let { data }: { data: LayoutData } = $props();
</script>

<section>
  <SelectMediaType />
</section>

<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  <RenderAnimes data={data.layoutData.anime!} />
</section>
