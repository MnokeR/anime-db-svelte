import { animeOptions, mangaOptions } from "$lib/server/utils";
import type { Anime, Manga } from "$lib/types/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ platform }) => {
  const animeCacheKey = "anime_data";
  const mangaCacheKey = "manga_data";
  const cacheTTL = 1800;
  const apiCache = platform?.env.API_CACHE;

  if (!apiCache) {
    throw new Error("API_CACHE is not defined in the platform environment");
  }
  const cachedAnimeData = await apiCache.get(animeCacheKey);
  const cachedMangaData = await apiCache.get(mangaCacheKey);

  let data: { anime?: Anime; manga?: Manga } = {};

  if (cachedAnimeData) {
    const animeData: { data: Anime } = JSON.parse(cachedAnimeData);
    data.anime = animeData.data;
  }

  if (cachedMangaData) {
    const mangaData: { data: Manga } = JSON.parse(cachedMangaData);
    data.manga = mangaData.data;
  }

  if (!cachedAnimeData) {
    try {
      const baseURL = platform?.env.BASE_URL;
      const response = await fetch(baseURL, animeOptions);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const animeData: { data: Anime } = await response.json();

      await apiCache.put(animeCacheKey, JSON.stringify(animeData), {
        expirationTtl: cacheTTL,
      });

      data.anime = animeData.data;
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  }

  if (!cachedMangaData) {
    try {
      const baseURL = platform?.env.BASE_URL;
      const response = await fetch(baseURL, mangaOptions);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const mangaData: { data: Manga } = await response.json();

      await apiCache.put(mangaCacheKey, JSON.stringify(mangaData), {
        expirationTtl: cacheTTL,
      });

      data.manga = mangaData.data;
    } catch (error) {
      console.error("Error fetching manga data:", error);
    }
  }

  return { layoutData: data };
};
