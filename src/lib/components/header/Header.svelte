<script lang="ts">
  import { page } from "$app/stores";
  import ThemeToggle from "./ThemeToggle.svelte";

  const links = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return $page.url.pathname === path;
    }
    return $page.url.pathname.startsWith(path);
  };
</script>

<div class="flex justify-end m-4 items-center gap-4">
  {#each links as link}
    <a href={link.path} class="font-semibold" class:active={isActive(link.path)}
      >{link.label}</a
    >
  {/each}
  <ThemeToggle />
</div>

<style>
  .active {
    @apply text-muted-foreground;
  }
</style>
