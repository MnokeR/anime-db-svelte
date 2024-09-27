<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { selectSeason, selectYears } from "$lib/search-select-options";
  import Select from "./Select.svelte";
</script>

<div class="flex flex-col items-center space-y-3">
  <form method="post" action="">
    <div class="flex justify-center w-full">
      <Input
        type="search"
        name="term"
        placeholder="search"
        class="w-max md:w-[380px]"
      />
    </div>
    <div class="flex w-full justify-center space-x-3">
      <Select selectOptions={selectYears} />
      <Select selectOptions={selectSeason} />
    </div>
  </form>
</div>
