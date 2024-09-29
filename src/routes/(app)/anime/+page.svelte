<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { animeSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import type { LayoutData } from "../../$types";
  import RenderAnimes from "./components/render-animes.svelte";
  import RenderSearch from "./components/render-search.svelte";
  import InView from "$lib/components/InView.svelte";
  import { Loader } from "lucide-svelte";

  type PageData = LayoutData & { searchData: SearchData }
  type SearchData = { Page: SearchResults }

  let { data }: { data: PageData } = $props();

  let animes = $state([data.searchData])
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
      type: 'ANIME',
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
        query: animeSearchQuery,
        variables
      })
    }

    const response = await fetch(BASE_URL, options)
    const searchData: {data: SearchData} = await response.json()
    animes = [...animes, searchData.data]
    pageInfo = searchData.data.Page.pageInfo
    fetchingNextPage = false
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
<section class="max-w-[1440px] mx-auto py-10">
  {#if !data.searchData}
      <RenderAnimes data={data.layoutData.anime!} />
  {/if}
  {#if data.searchData}
    <h1 class="text-center">Search</h1>
    <div class='flex flex-wrap justify-center gap-3'>
      {#each animes as list}
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
