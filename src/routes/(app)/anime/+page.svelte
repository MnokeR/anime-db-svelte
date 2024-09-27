<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { LayoutData } from "../../$types";
  import RenderAnimes from "../components/render-animes.svelte";

  let { data }: { data: LayoutData } = $props();
</script>

<section>
  <SelectMediaType />
  <Form />
</section>
<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  <RenderAnimes data={data.anime!} />
</section>
