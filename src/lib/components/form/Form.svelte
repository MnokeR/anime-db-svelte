<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { debounce } from "$lib/debounce";
  import {
    selectAnimeFormat,
    selectAnimeStatus,
    selectCountry,
    selectGenres,
    selectMangaFormat,
    selectMangaStatus,
    selectSeason,
    selectSort,
    selectYears,
  } from "$lib/search-select-options";
  import Input from "./Input.svelte";
  import Select from "./Select.svelte";
  import SelectMulti from "./SelectMulti.svelte";

  const searchParams = $page.url.searchParams;
  const path = $page.url.pathname;
  const mediaType = $state(path === "/search/anime" ? "Anime" : "Manga");
  let search = $state(searchParams.get("search") || "");

  const updateSearchParams = () => {
    goto(`?${searchParams.toString()}`, { invalidateAll: true });
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const param = target.name;
    if (value === "") {
      searchParams.delete(param);
    } else {
      searchParams.set(param, value);
    }
    updateSearchParams();
    if (param === "search") {
      search = value;
    }
  };
  const debounceHandleChange = debounce(handleChange);
</script>

<div class="flex flex-col items-center space-y-3">
  <Input {search} {debounceHandleChange} />
  <div class="flex w-full flex-wrap justify-center gap-3">
    <SelectMulti options={selectGenres} />
    <Select options={selectYears} />
    {#if mediaType === "Anime"}
      <Select options={selectSeason} />
      <Select options={selectAnimeFormat} />
      <Select options={selectAnimeStatus} paramName="status" />
    {/if}
    {#if mediaType === "Manga"}
      <Select options={selectMangaFormat} />
      <Select options={selectMangaStatus} paramName="status" />
    {/if}
    <Select options={selectCountry} paramName="countryOfOrigin" />
    <Select options={selectSort} />
  </div>
</div>
