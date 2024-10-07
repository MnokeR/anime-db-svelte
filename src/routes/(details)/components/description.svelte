<script lang="ts">
  import type { MediaDetails } from "$lib/types/details";
  import Banner from "./banner.svelte";

  let { media }: { media: MediaDetails } = $props();
  const scoreStyles = [
    "bg-red-700", // 0-9
    "bg-red-600", // 10-19
    "bg-red-500", // 20-29
    "bg-red-400", // 30-39
    "bg-red-300", // 40-49
    "bg-orange-600", // 50-59
    "bg-yellow-600", // 60-69
    "bg-lime-600", // 70-79
    "bg-green-600", // 80-89
    "bg-blue-600", // 90-100
  ];
  const style = scoreStyles[Math.floor(media.averageScore / 10)];
</script>

<section class="md:bg-secondary mx-auto max-w-screen-2xl mb-10">
  <Banner banner={media.bannerImage} />
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex justify-center md:justify-normal p-4">
      <div class="relative h-[360px]">
        <img
          class="bg-muted rounded-md w-[240px] h-[360px]"
          src={media.coverImage.large}
          alt="Cover"
        />
        {#if media.averageScore}
          <div class="absolute -top-2 left-[50%] translate-x-[-50%]">
            <span class={`text-2xl px-2 rounded-md shadow text-white ${style}`}
              >{media.averageScore}</span
            >
          </div>
        {/if}
      </div>
    </div>

    <div class="flex-1 flex flex-col gap-4 p-4">
      <div class="flex-1">
        <h1 class="text-xl font-serif">
          {media?.title.userPreferred}
        </h1>
        <p class="text-muted-foreground">{@html media.description}</p>
      </div>

      <div class="flex flex-none gap-2">
        {#each media.genres as genre}
          <a
            href={`/search/${media.type.toLowerCase()}?genres=${genre}`}
            class="hover:scale-105 transition-transform duration-150 ease-in-out"
            ><span class="bg-destructive px-1 rounded-md"> {genre}</span></a
          >
        {/each}
      </div>
    </div>
  </div>
</section>
