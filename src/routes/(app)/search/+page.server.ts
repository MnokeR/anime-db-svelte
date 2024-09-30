import { animeSearchQuery, mangaSearchQuery } from "$lib/server/query";
import type { SearchResults } from "$lib/server/query-types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ url, platform }) => {
  const BASE_URL = platform!.env.BASE_URL;
  const searchParams = url.searchParams;
  const hasParams =
    [...searchParams.keys()].filter((key) => key !== "type").length > 0;

  const params = {
    type: searchParams.get("type") || undefined,
    search: searchParams.get("term") || undefined,
    format: searchParams.get("format") || undefined,
    year: searchParams.get("year") || undefined,
    season: searchParams.get("season") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const searchVariables = {
    page: 1,
    type: "ANIME",
    search: params.search,
    year: params.year && params.year + "%",
    format: params.type === "MANGA" ? undefined : params.format,
    season: params.type === "MANGA" ? undefined : params.season,
    sort: params.sort
      ? params.sort
      : params.search
      ? "SEARCH_MATCH"
      : undefined,
  };

  const searchOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: params.type === "MANGA" ? mangaSearchQuery : animeSearchQuery,
      variables: searchVariables,
    }),
  };

  if (!hasParams) {
    return;
  }

  try {
    const response = await fetch(BASE_URL, searchOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const searchData: { data: SearchResults } = await response.json();
    return { searchData: searchData.data };
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
};
