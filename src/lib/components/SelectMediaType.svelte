<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./ui/button/button.svelte";

  // const selectTypes = [
  //   { label: "Anime", path: "/" },
  //   { label: "Manga", path: "/manga" },
  // ];
  type SelectMediaType = {
    mediaType: (type: "Anime" | "Manga") => void;
  };
  let { mediaType }: SelectMediaType = $props();
</script>

<div class="flex justify-center gap-4 py-10">
  <Button onclick={() => mediaType("Anime")}>Anime</Button>
  <Button onclick={() => mediaType("Manga")}>Manga</Button>
</div>
