<script lang="ts">
  import { onMount } from "svelte";

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

  function setTheme(e: Event) {
    const target = e.target as HTMLSelectElement;
    if (target.value === "system") {
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        theme = "light";
      }
    }
    if (target.value === "light") {
      document.documentElement.classList.remove("dark");
      theme = "light";
    } else if (target.value === "dark") {
      document.documentElement.classList.add("dark");
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  }
</script>

<select onchange={(e) => setTheme(e)} class="bg-background text-foreground">
  <option value="system">System</option>
  <option value="dark">Dark</option>
  <option value="light">Light</option>
</select>
