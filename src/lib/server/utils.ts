import type { PageInfo, SearchVariables } from "$lib/types/types";
import {
  animeQuery,
  animeSearchQuery,
  detailsQuery,
  mangaQuery,
  mangaSearchQuery,
} from "./query";

// SEASONS AND DATES
const date = new Date();
const seasons = [
  { label: "WINTER", months: [1, 2, 3] },
  { label: "SPRING", months: [4, 5, 6] },
  { label: "SUMMER", months: [7, 8, 9] },
  { label: "FALL", months: [10, 11, 12] },
];

let season: string = "";
let nextSeason: string = "";
let nextYear: number = 0;
const currentMonth = date.getMonth() + 1;
const year = date.getFullYear();
for (let i = 0; i < seasons.length; i++) {
  if (seasons[i].months.includes(currentMonth)) {
    season = seasons[i].label;
    const currentIndex = i;
    const nextIndex =
      currentIndex === seasons.length - 1 ? 0 : currentIndex + 1;
    nextSeason = seasons[nextIndex].label;
    nextYear = currentIndex === seasons.length - 1 ? year + 1 : year;
    break;
  }
}

// FETCH OPTIONS DEFAULT ANIME
const animeVariables = {
  type: "ANIME",
  season: season,
  seasonYear: year,
  nextSeason: nextSeason,
  nextYear: nextYear,
};

export const animeOptions = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "Cache-Control": "public, max-age=60",
  },
  body: JSON.stringify({
    query: animeQuery,
    variables: animeVariables,
  }),
};

export const animeCategories = [
  { label: "Trending", value: "trending" },
  { label: "Season Top", value: "season" },
  { label: "Next Season", value: "nextSeason" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
];

// FETCH OPTIONS DEFAULT MANGA
const mangaVariables = {
  type: "MANGA",
  season: season,
  seasonYear: year,
  nextSeason: nextSeason,
  nextYear: nextYear,
};

export const mangaCategories = [
  { label: "Trending", value: "trending" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
];

export const mangaOptions = {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "Cache-Control": "public, max-age=60",
  },
  body: JSON.stringify({
    query: mangaQuery,
    variables: mangaVariables,
  }),
};

// FETCH OPTIONS FOR MEDIA PAGES
type DetailsOptions = {
  id: number;
  mediaType: "ANIME" | "MANGA";
};
export const detailsOptions = ({ id, mediaType }: DetailsOptions) => {
  const variables = {
    id,
    type: mediaType,
  };

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Cache-Control": "public, max-age=900",
    },
    body: JSON.stringify({
      query: detailsQuery,
      variables,
    }),
  };
  return options;
};

// FETCH OPTIONS FOR MEDIA SEARCH
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

export const searchableParams = [
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
