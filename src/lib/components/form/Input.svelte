<script lang="ts">
  import { Input } from "../ui/input";
  type FormProps = {
    search: string;
    debounceHandleChange: (...args: any[]) => void;
  };

  let { search, debounceHandleChange }: FormProps = $props();
</script>

<div class="flex justify-center w-full">
  <Input
    type="search"
    autocomplete="off"
    name="search"
    value={search}
    placeholder="search"
    class="w-full md:w-[600px] mx-5"
    oninput={debounceHandleChange}
  />
</div>
