<script lang="ts">
  import Skeleton from "$lib/components/ui/Skeleton.svelte";

  let { banner }: { banner: string | undefined } = $props();
  let bannerLoaded = $state(false);
</script>

{#if banner}
  <div class="relative md:flex hidden md:h-[400px]">
    {#if !bannerLoaded}
      <Skeleton class="w-full" />
    {/if}
    <img
      src={banner}
      alt="Banner"
      onload={() => (bannerLoaded = true)}
      class="object-cover object-center w-full"
    />
  </div>
{/if}
