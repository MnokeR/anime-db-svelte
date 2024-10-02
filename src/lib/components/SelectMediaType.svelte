<script lang="ts">
  import Button from "./ui/button/button.svelte";

  const mediaTypeLinks = [
    { label: "Anime", path: "/search/anime" },
    { label: "Manga", path: "/search/manga" },
  ];
</script>

<div class="flex justify-center gap-4 py-10">
  {#each mediaTypeLinks as link}
    <Button variant="outline"><a href={link.path}>{link.label}</a></Button>
  {/each}
</div>
