import { getParams, searchOptions } from "$lib/server/query";
import type { SearchResults } from "$lib/server/query-types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, platform }) => {
  const BASE_URL = platform!.env.BASE_URL;
  const searchParams = url.searchParams;
  const hasParams = [...searchParams.keys()].length > 0;
  const mediaType = "Anime";

  const params = getParams(searchParams);
  const animeSearchOptions = searchOptions({ params, mediaType });
  console.log("Reached Loader");
  if (!hasParams) {
    return;
  }

  try {
    const response = await fetch(BASE_URL, animeSearchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const animeSearchData: { data: SearchResults } = await response.json();
    console.log("Reached Data");
    return { searchData: animeSearchData.data };
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
};
