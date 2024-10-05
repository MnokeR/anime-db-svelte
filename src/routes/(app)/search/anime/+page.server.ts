import { getParams, searchOptions } from "$lib/server/utils";
import type { SearchResults } from "$lib/types/types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, platform }) => {
  const BASE_URL = platform!.env.BASE_URL;
  const searchParams = url.searchParams;
  const hasParams = [...searchParams.keys()].length > 0;
  const mediaType = "Anime";

  const params = getParams(searchParams);
  const animeSearchOptions = searchOptions({ params, mediaType });
  if (!hasParams) {
    return;
  }

  try {
    const response = await fetch(BASE_URL, animeSearchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const animeSearchData: { data: SearchResults } = await response.json();
    return { searchData: animeSearchData.data };
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
};
