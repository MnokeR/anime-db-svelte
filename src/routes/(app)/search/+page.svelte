<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { animeSearchQuery, mangaSearchQuery } from "$lib/query";
  import type { SearchResults } from "$lib/server/query-types";
  import type { LayoutData } from "../../$types";
  import InView from "$lib/components/InView.svelte";
  import { Loader } from "lucide-svelte";
  import RenderDefault from "./components/render-default.svelte";
  import RenderSearch from "./components/render-search.svelte";
  import { animeCategories, mangaCategories } from "$lib/query";
  import Button from "$lib/components/ui/button/button.svelte";
  import { goto } from "$app/navigation";

  type PageData = LayoutData & { searchData: SearchData }
  type SearchData = { Page: SearchResults }

  let { data }: { data: PageData } = $props();
  let searchResults = $state([data.searchData])
  let pageInfo = $state(data.searchData?.Page.pageInfo)
  let fetchingNextPage = $state(false)
  const searchParams = $page.url.searchParams
  let mediaType = $state<'ANIME' | 'MANGA'>('ANIME');

  const fetchNextPage = async () => {
    const BASE_URL = 'https://graphql.anilist.co'
    if (!pageInfo.hasNextPage || fetchingNextPage) return;
    fetchingNextPage = true
    const params = {
      type: searchParams.get('type') || undefined,
      search: searchParams.get('term') || undefined,
      genres: searchParams.getAll('genres') || undefined,
      year: searchParams.get('year') || undefined,
      season: searchParams.get('season') || undefined,
      sort: searchParams.get('sort') || undefined
    }
    const variables = {
      type: params.type ? params.type : 'ANIME',
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
        query: mediaType === 'MANGA' ? mangaSearchQuery : animeSearchQuery,
        variables
      })
    }

    const response = await fetch(BASE_URL, options)
    const searchData: {data: SearchData} = await response.json()
    searchResults = [...searchResults, searchData.data]
    pageInfo = searchData.data.Page.pageInfo
    fetchingNextPage = false
  }

  const handleMediaType = (type: 'ANIME' | 'MANGA') => {
    mediaType = type
    goto(`?type=${type}`)
  }

  $effect(() => {
    data.searchData?.Page
    searchResults = [data.searchData]
    pageInfo = data.searchData?.Page.pageInfo
  })

</script>

<section>
  <div class="flex justify-center gap-4 m-4">
    <Button variant='ghost' disabled={mediaType === 'ANIME'} onclick={() => handleMediaType('ANIME')}>Anime</Button>
    <Button variant='ghost' disabled={mediaType === 'MANGA'} onclick={() => handleMediaType('MANGA')}>Manga</Button>
  </div>
  <!-- <SelectMediaType /> -->
  <Form />
</section>
<section class="max-w-[1440px] mx-auto py-10">
  {#if !data.searchData}
      <RenderDefault data={mediaType === 'MANGA' ? data.layoutData.manga! : data.layoutData.anime!} categories={mediaType === 'MANGA' ? mangaCategories : animeCategories} />
  {/if}
  {#if data.searchData}
    <h1 class="text-center">Search</h1>
    <div class='flex flex-wrap justify-center gap-3'>
      {#each searchResults as result}
        <RenderSearch data={result?.Page} />
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
