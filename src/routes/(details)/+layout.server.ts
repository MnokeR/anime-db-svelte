import { BASE_URL } from "$lib/server/query";
import { detailsOptions } from "$lib/server/utils";
import type { DetailsPage } from "$lib/types/details";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, platform, url }) => {
  const cacheKey = `media_${params.slug}`;
  const cacheTTL = 3600;
  const apiCache = platform?.env.API_CACHE;
  const mediaType = url.pathname.includes("anime") ? "ANIME" : "MANGA";
  const options = detailsOptions({ id: Number(params.slug), mediaType });

  if (!apiCache) {
    throw new Error("API_CACHE is not defined in the platform environment");
  }
  const cachedMedia = await apiCache.get(cacheKey);

  if (cachedMedia) {
    const mediaData: { data: DetailsPage } = JSON.parse(cachedMedia);
    return { details: mediaData.data };
  }

  if (!cachedMedia) {
    const response = await fetch(BASE_URL, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const mediaData: { data: DetailsPage } = await response.json();
    await apiCache.put(cacheKey, JSON.stringify(mediaData), {
      expirationTtl: cacheTTL,
    });
    return { details: mediaData.data };
  }
};
