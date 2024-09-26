<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
  import { selectYears } from "$lib/search-select-options";
  import Select from "./Select.svelte";
</script>

<div class="flex justify-center">
  <Input type="search" name="term" placeholder="search" class="max-w-[380px]" />
  <Select option="Year" items={selectYears} />
</div>
