<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import InView from "$lib/components/InView.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { mangaCategories, mangaSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import { Loader } from "lucide-svelte";
  import type { LayoutData } from "../../../$types";
  import RenderDefault from "../../components/render-default.svelte";
  import RenderSearch from "../../components/render-search.svelte";

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

<section class="max-w-screen-xl mx-auto rounded-md px-5">
  <div class="bg-secondary rounded-md pb-4">
    <SelectMediaType />
    <Form />
  </div>
</section>
<section class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10">
  {#if !data.searchData}
    <RenderDefault data={data.layoutData.manga!} categories={mangaCategories} />
  {/if}
  {#if data.searchData}
    <div class="text-muted-foreground text-center py-4">
      <h1 class="font-semibold text-lg">Search</h1>
      {#if searchParams.get('term')}
        <p>"{searchParams.get('term')}"</p>
      {/if}
      
    </div>
    <div class='flex flex-wrap justify-center gap-3'>
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
 