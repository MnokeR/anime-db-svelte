<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { animeSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import type { LayoutData } from "../../$types";
  import RenderAnimes from "./components/render-animes.svelte";
  import RenderSearch from "./components/render-search.svelte";

  type PageData = LayoutData & { searchData: SearchData }
  type SearchData = { Page: SearchResults }

  let { data }: { data: PageData } = $props();

  let animes = $state([data.searchData])
  let pageInfo = $state(data.searchData?.Page.pageInfo)
  
  const searchParams = $page.url.searchParams      
  const fetchNextPage = async () => {
    const BASE_URL = 'https://graphql.anilist.co'
    if (!pageInfo.hasNextPage) return;

    const variables = {
      type: 'ANIME',
      page: pageInfo.currentPage + 1,
      search: searchParams.get('term')
    }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: animeSearchQuery,
        variables
      })
    }

    const response = await fetch(BASE_URL, options)
    const searchData: {data: SearchData} = await response.json()
    animes = [...animes, searchData.data]
    pageInfo = searchData.data.Page.pageInfo
  }

  $effect(() => {
    data.searchData?.Page
    animes = [data.searchData]
    pageInfo = data.searchData?.Page.pageInfo
  })

</script>

<section>
  <SelectMediaType />
  <Form />
</section>
<section class="max-w-[1440px] mx-auto overflow-hidden py-10">
  {#if !data.searchData}
      <RenderAnimes data={data.layoutData.anime!} />
  {/if}
  {#if data.searchData}

    <h1 class="text-center">Search</h1>
    {#each animes as list}
      <RenderSearch data={list?.Page} />
     {/each}     
  {#if pageInfo?.hasNextPage}
    <button onclick={fetchNextPage}>next page</button>
  {/if}
  {/if}
</section>
