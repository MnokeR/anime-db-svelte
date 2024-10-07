import type { MediaDetails } from "$lib/types/details";
import type { SearchVariables } from "$lib/types/types";
import { animeSearchQuery, mangaSearchQuery } from "./query";

// ANIME CATEGORIES
export const animeCategories = [
  { label: "Trending", value: "trending" },
  { label: "Season Top", value: "season" },
  { label: "Next Season", value: "nextSeason" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
];

// MANGA CATEGORIES
export const mangaCategories = [
  { label: "Trending", value: "trending" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
];

// LOGIC TO FETCH NEXT PAGE
export type PageInfo = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

type SearchOptionsParams = {
  params: SearchVariables;
  pageInfo?: PageInfo;
  mediaType: "Anime" | "Manga";
};

export const searchOptions = ({
  params,
  pageInfo,
  mediaType,
}: SearchOptionsParams) => {
  const genres = params.genres
    ? params.genres.split(",").map((item) => item.trim())
    : undefined;
  const adult = params.isAdult === "True" ? true : false;
  const variables = {
    page: pageInfo ? pageInfo.currentPage + 1 : 1,
    type: mediaType === "Anime" ? "ANIME" : "MANGA",
    search: params.search,
    genres: genres,
    year: params.year && params.year + "%",
    season: params.season,
    format: params.format,
    status: params.status,
    countryOfOrigin: params.countryOfOrigin,
    isAdult: adult,
    sort: params.sort
      ? params.sort
      : params.search
      ? "SEARCH_MATCH"
      : undefined,
  };
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: mediaType === "Anime" ? animeSearchQuery : mangaSearchQuery,
      variables,
    }),
  };
  return options;
};

const searchableParams = [
  "search",
  "genres",
  "year",
  "season",
  "format",
  "status",
  "countryOfOrigin",
  "isAdult",
  "sort",
];

export const getParams = (searchParam: URLSearchParams) => {
  const searchParams: SearchVariables = {} as SearchVariables;
  searchableParams.forEach((param) => {
    searchParams[param as keyof SearchVariables] =
      searchParam.get(param) || undefined;
  });
  return searchParams;
};

export const animeInfoList = (media: MediaDetails) => {
  return [
    { label: "Native", info: media.title.native },
    { label: "English", info: media.title.english },
    { label: "Status", info: media.status },
    {
      label: "Start Date",
      info:
        media.startDate.month +
        ", " +
        media.startDate.day +
        ", " +
        media.startDate.year,
    },
    { label: "Season", info: media.season },
  ];
};
