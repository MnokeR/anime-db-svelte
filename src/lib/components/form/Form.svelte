<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Input } from "$lib/components/ui/input/index.js";
  import { debounce } from "$lib/debounce";
  import { selectSeason, selectYears } from "$lib/search-select-options";
  import Select from "./Select.svelte";

  const searchParams = $page.url.searchParams;
  let term = $state(searchParams.get("term") || "");

  const updateSearchParams = () => {
    goto(`?${searchParams.toString()}`, { replaceState: true });
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
    if (param === "term") {
      term = value;
    }
  };
  const debounceHandleChange = debounce(handleChange);
</script>

<div class="flex flex-col items-center space-y-3">
  <div class="flex justify-center w-full">
    <Input
      type="search"
      name="term"
      value={term}
      placeholder="search"
      class="w-max md:w-[380px]"
      oninput={debounceHandleChange}
    />
  </div>
  <div class="flex w-full justify-center space-x-3">
    <Select selectOptions={selectYears} />
    <Select selectOptions={selectSeason} />
  </div>
</div>
