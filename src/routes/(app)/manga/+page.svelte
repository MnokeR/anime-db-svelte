<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { PageData } from "./$types";
  import RenderMangas from "./components/render-mangas.svelte";

  let { data }: { data: PageData } = $props();
</script>

<section>
  <SelectMediaType />
  <Form />
</section>
<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  <RenderMangas data={data.manga!} />
</section>
