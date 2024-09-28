<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import type { SearchResults } from "$lib/server/query-types";
  import type { LayoutData } from "../../$types";
  import RenderMangas from "./components/render-mangas.svelte";
  import RenderSearch from "./components/render-search.svelte";

  type PageData = LayoutData & {
    searchData: {
      Page: SearchResults
    }
  }

  let { data }: { data: PageData } = $props();
  
</script>

<section>
  <SelectMediaType />
  <Form />
</section>
<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  {#if !data.searchData}
    <RenderMangas data={data.layoutData.manga!} />
  {/if}
  {#if data.searchData}
    <RenderSearch data={data.searchData.Page} />
  {/if}
</section>
