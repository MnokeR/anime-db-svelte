import { mangaSearchQuery } from "$lib/server/query";
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

  const mangaSearchVariables = {
    page: 1,
    type: "MANGA",
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

  const mangaSearchOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: mangaSearchQuery,
      variables: mangaSearchVariables,
    }),
  };

  try {
    const response = await fetch(BASE_URL, mangaSearchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const mangaSearchResults: { data: SearchResults } = await response.json();

    return { searchData: mangaSearchResults.data };
  } catch (error) {
    console.error("Error fetching manga data:", error);
  }
};