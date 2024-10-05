<script lang="ts">
  import type { LayoutData } from "../../$types";
  import Description from "../../components/description.svelte";

  let { data }: { data: LayoutData } = $props();
  let media = data.details?.Media;
</script>

<svelte:head>
  <title>{media?.title.userPreferred}</title>
</svelte:head>
{#if media}
  <Description {media} />
{/if}
