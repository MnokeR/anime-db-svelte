import { mangaSearchQuery } from "$lib/server/query";
import type { SearchResults } from "$lib/server/query-types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, platform }) => {
  const BASE_URL = platform!.env.BASE_URL;
  const searchParams = url.searchParams;
  const hasParams = [...searchParams.keys()].length > 0;

  const params = {
    search: searchParams.get("term") || undefined,
    genres: searchParams.get("genres") || undefined,
    year: searchParams.get("year") || undefined,
    season: searchParams.get("season") || undefined,
    format: searchParams.get("format") || undefined,
    status: searchParams.get("status") || undefined,
    countryOfOrigin: searchParams.get("countryOfOrigin") || undefined,
    sort: searchParams.get("sort") || undefined,
  };
  const genres = params.genres
    ? params.genres.split(",").map((item) => item.trim())
    : undefined;

  const mangaSearchVariables = {
    page: 1,
    type: "MANGA",
    search: params.search,
    genres: genres,
    year: params.year && params.year + "%",
    season: params.season,
    format: params.format,
    status: params.status,
    countryOfOrigin: params.countryOfOrigin,
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
      "Cache-Control": "public, max-age=900",
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
