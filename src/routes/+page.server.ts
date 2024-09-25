// import { animeOptions, BASE_URL } from "$lib/server/query";
// import type { Anime } from "$lib/server/query-types";
// import type { PageServerLoad } from "./$types";

// export const load: PageServerLoad = async () => {
//   try {
//     const resp = await fetch(BASE_URL, animeOptions);
//     const data: { data: Anime } = await resp.json();

//     console.log("here");
//     if (resp.ok) {
//       return data.data;
//     }
//   } catch (error) {
//     console.error(error);
//     return { error: "Failed to fetch data" };
//   }
// };

import { env } from "$env/dynamic/private";
import { animeOptions } from "$lib/server/query";
import type { Anime } from "$lib/server/query-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform }) => {
  const cacheKey = "anime_data";
  const cacheTTL = 3600;
  const apiCache = platform?.env.API_CACHE;

  if (!apiCache) {
    throw new Error("API_CACHE is not defined in the platform environment");
  }

  const cachedAnimeData = await apiCache.get(cacheKey);

  if (cachedAnimeData) {
    return JSON.parse(cachedAnimeData);
  }
  try {
    const response = await fetch(platform.env.BASE_URL, animeOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const animeData: { data: Anime } = await response.json();

    await apiCache.put(cacheKey, JSON.stringify(animeData), {
      expirationTtl: cacheTTL,
    });

    return animeData.data;
  } catch (error) {}

  const response = await fetch(env.BASE_URL, animeOptions);
  const animeData: { data: Anime } = await response.json();
  await apiCache.put(cacheKey, JSON.stringify(animeData), {
    expirationTtl: cacheTTL,
  });

  return animeData.data;
};
