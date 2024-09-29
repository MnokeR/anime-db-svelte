<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import InView from "$lib/components/InView.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { mangaSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import { Loader } from "lucide-svelte";
  import type { LayoutData } from "../../$types";
  import RenderMangas from "./components/render-mangas.svelte";
  import RenderSearch from "./components/render-search.svelte";

  type PageData = LayoutData & { searchData: SearchData }
  type SearchData = { Page: SearchResults }

  let { data }: { data: PageData } = $props();

  let mangas = $state([data.searchData])
  let pageInfo = $state(data.searchData?.Page.pageInfo)
  let fetchingNextPage = $state(false)
  const searchParams = $page.url.searchParams      

  const fetchNextPage = async () => {
    const BASE_URL = 'https://graphql.anilist.co'
    if (!pageInfo.hasNextPage || fetchingNextPage) return;
    fetchingNextPage = true
    const params = {
      search: searchParams.get('term') || undefined,
      year: searchParams.get('year') || undefined,
      season: searchParams.get('season') || undefined,
      sort: searchParams.get('sort') || undefined
    }
    const variables = {
      type: 'MANGA',
      page: pageInfo.currentPage + 1,
      search: params.search,
      year: params.year ? params.year + '%' : undefined,
      season: params.season,
      sort: params.sort ? params.sort : params.search ? 'SEARCH_MATCH' : undefined
    }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: mangaSearchQuery,
        variables
      })
    }

    const response = await fetch(BASE_URL, options)
    const searchData: {data: SearchData} = await response.json()
    mangas = [...mangas, searchData.data]
    pageInfo = searchData.data.Page.pageInfo
    fetchingNextPage = false
  }

  $effect(() => {
    data.searchData?.Page
    mangas = [data.searchData]
    pageInfo = data.searchData?.Page.pageInfo
  })
  
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
  <h1 class="text-center">Search</h1>
  <div class='flex flex-wrap gap-3 justify-center'>
    {#each mangas as list}
      <RenderSearch data={list?.Page} />
    {/each}  
  </div>
  <div class="flex justify-center">
    {#if pageInfo?.hasNextPage && !fetchingNextPage}
    <InView loadMore={fetchNextPage} />
    {/if}
    {#if fetchingNextPage}
      <Loader class='animate-spin' />
    {/if}
  </div>
  {/if}
</section>
 