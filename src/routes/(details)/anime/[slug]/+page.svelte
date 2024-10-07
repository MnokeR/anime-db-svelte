<script lang="ts">
  import type { LayoutData } from "../../$types";
  import Description from "../../components/description.svelte";
  import MediaInfo from "../../components/media-info.svelte";

  let { data }: { data: LayoutData } = $props();
  let media = data.details?.Media;
</script>

<svelte:head>
  <title>{media?.title.userPreferred}</title>
</svelte:head>
{#if media}
  <Description {media} />
  <MediaInfo {media} />
{/if}
