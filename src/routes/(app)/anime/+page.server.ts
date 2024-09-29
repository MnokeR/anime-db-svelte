import { animeSearchQuery } from "$lib/server/query";
import type { SearchResults } from "$lib/server/query-types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, platform }) => {
  const BASE_URL = platform!.env.BASE_URL;
  const searchParams = url.searchParams;
  const hasParams = [...searchParams.keys()].length > 0;
  const params = {
    search: searchParams.get("term") || undefined,
    format: searchParams.get("format") || undefined,
    year: searchParams.get("year") || undefined,
    season: searchParams.get("season") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const animeSearchVariables = {
    page: 1,
    type: "ANIME",
    search: params.search,
    format: params.format,
    year: params.year && params.year + "%",
    season: params.season,
    sort: params.sort
      ? params.sort
      : params.search
      ? "SEARCH_MATCH"
      : undefined,
  };

  if (!hasParams) {
    return;
  }

  const animeSearchOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: animeSearchQuery,
      variables: animeSearchVariables,
    }),
  };

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
