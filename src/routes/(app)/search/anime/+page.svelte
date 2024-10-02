<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { animeCategories, animeSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import InView from "$lib/components/InView.svelte";
  import { Loader } from "lucide-svelte";
  import type { LayoutData } from "../../../$types";
  import RenderDefault from "../../components/render-default.svelte";
  import RenderSearch from "../../components/render-search.svelte";
  import Skeleton from "$lib/components/ui/Skeleton.svelte";
  
  type PageData = LayoutData & { searchData: SearchData }
  type SearchData = { Page: SearchResults }

  let { data }: { data: PageData } = $props();

  let animes = $state([data.searchData])
  let pageInfo = $state(data.searchData?.Page.pageInfo)
  let fetchingNextPage = $state(false)
  let imageLoaded = $state(false)
  
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
<svelte:head>
	<title>Anime DB | Search Anime</title>
	<meta name="description" content="Discover new Animes or search for your favorite!" />
</svelte:head>

<section class="max-w-screen-xl mx-auto rounded-md px-5">
  <div class="bg-secondary rounded-md pb-4">
  <SelectMediaType />
  <Form />
</div>
</section>
<section class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10">
  {#if !data.searchData}
      <RenderDefault data={data.layoutData.anime!} categories={animeCategories} />
  {/if}
  {#if data.searchData}
  <h1 class="py-4 font-semibold text-lg text-muted-foreground text-center">
    Search</h1>
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
