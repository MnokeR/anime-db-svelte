<script lang="ts">
  import { onMount } from "svelte";
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";
  import Monitor from "lucide-svelte/icons/monitor-cog";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button } from "$lib/components/ui/button/index.js";

  let theme: string;
  let prefersDark: boolean;

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || (prefersDark ? "dark" : "light");
  };

  onMount(() => {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme = getInitialTheme();
  });

  function setTheme(target: string) {
    if (target === "system") {
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        theme = "light";
      }
    }
    if (target === "light") {
      document.documentElement.classList.remove("dark");
      theme = "light";
    } else if (target === "dark") {
      document.documentElement.classList.add("dark");
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="ghost" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item onclick={() => setTheme("light")} class="relative"
      >Light<Sun
        class="h-[1.2rem] w-[1.2rem] absolute right-2"
      /></DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => setTheme("dark")}
      >Dark<Moon
        class="h-[1.2rem] w-[1.2rem] absolute right-2"
      /></DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => setTheme("system")}
      >System<Monitor
        class="h-[1.2rem] w-[1.2rem] absolute right-2"
      /></DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
