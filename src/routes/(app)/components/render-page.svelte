<script lang="ts">
  import { page } from "$app/stores";
  import Form from "$lib/components/form/Form.svelte";
  import SelectMediaType from "$lib/components/SelectMediaType.svelte";
  import { animeCategories, getParams, mangaCategories, searchOptions } from "$lib/client/utils";
  import type { Anime, Manga, SearchResults } from "$lib/types/types";
  import InView from "$lib/components/InView.svelte";
  import { Loader } from "lucide-svelte";
  import RenderDefault from "./render-default.svelte";
  import RenderSearch from "./render-search.svelte";
  import { BASE_URL } from "$lib/client/query";
  
  type PageData = {
    layoutData: {
        anime?: Anime;
        manga?: Manga;
    };
    } & {
    searchData: SearchData;
    }
  type SearchData = { Page: SearchResults }
  type MediaType = 'Anime' | 'Manga'

  let { data, mediaType }: { data: PageData, mediaType: MediaType } = $props();
  let mediaData = $state([data.searchData])
  let pageInfo = $state(data.searchData?.Page.pageInfo)
  let fetchingNextPage = $state(false)
  
  const searchParams = $page.url.searchParams 

  const fetchNextPage = async () => {
    if (!pageInfo.hasNextPage || fetchingNextPage) return;
    fetchingNextPage = true
    const params = getParams(searchParams)
    const options = searchOptions({params, pageInfo, mediaType})
    const response = await fetch(BASE_URL, options)
    const searchData: {data: SearchData} = await response.json()
    mediaData = [...mediaData, searchData.data]
    pageInfo = searchData.data.Page.pageInfo
    fetchingNextPage = false
  }

  $effect(() => {
    data.searchData?.Page
    mediaData = [data.searchData]
    pageInfo = data.searchData?.Page.pageInfo
  })

</script>
<section class="max-w-screen-xl mx-auto rounded-md px-5">
  <SelectMediaType />
  <Form />
</section>
<section class="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto py-10">
  {#if !data.searchData}
      <RenderDefault data={mediaType === 'Anime' ? data.layoutData.anime! : data.layoutData.manga!} categories={mediaType === 'Anime'? animeCategories : mangaCategories} />
  {/if}
  {#if data.searchData}
  <h1 class="py-4 font-semibold text-lg text-muted-foreground text-center">
    Search</h1>
    <div class='flex flex-wrap justify-center gap-3'>
      {#each mediaData as list}
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
