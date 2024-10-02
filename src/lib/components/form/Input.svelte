<script lang="ts">
  import { Input } from "../ui/input";
  type FormProps = {
    term: string;
    debounceHandleChange: (...args: any[]) => void;
  };

  let { term, debounceHandleChange }: FormProps = $props();
</script>

<div class="flex justify-center w-full">
  <Input
    type="search"
    autocomplete="off"
    name="term"
    value={term}
    placeholder="search"
    class="w-full md:w-[600px] mx-5"
    oninput={debounceHandleChange}
  />
</div>
