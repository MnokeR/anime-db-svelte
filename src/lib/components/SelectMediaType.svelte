<script lang="ts">
  import { page } from "$app/stores";
  import Button from "./ui/button/button.svelte";

  const currentPath = $page.url.pathname;

  const mediaTypeLinks = [
    { label: "Anime", path: "/search/anime", img: "/images/anime.png" },
    { label: "Manga", path: "/search/manga", img: "/images/manga.png" },
  ];
</script>

<div class="flex justify-center gap-4">
  {#each mediaTypeLinks as link}
    <div class="relative">
      <Button variant="ghost">
        <a class={link.path === currentPath ? "isActive" : ""} href={link.path}
          >{link.label}</a
        >
      </Button>
    </div>
  {/each}
</div>

<style>
  .isActive {
    @apply text-muted-foreground;
  }
</style>
