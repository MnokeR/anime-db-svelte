<script>
  const selectTypes = [
    { label: "Anime", path: "/" },
    { label: "Manga", path: "/manga" },
  ];
</script>

<div class="flex justify-center gap-4 py-10">
  {#each selectTypes as type}
    <h2 class="text-lg font-semibold"><a href={type.path}>{type.label}</a></h2>
  {/each}
</div>
