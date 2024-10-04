export type Anime = {
  trending: { media: AnimeShort[] };
  top: { media: AnimeShort[] };
  popular: { media: AnimeShort[] };
  season: { media: AnimeShort[] };
  nextSeason: { media: AnimeShort[] };
};

export type Manga = {
  trending: { media: AnimeShort[] };
  popular: { media: AnimeShort[] };
  manhwa: { media: AnimeShort[] };
  top: { media: AnimeShort[] };
};

export type AnimeShort = {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    large: string;
    extraLarge: string;
    color: string;
  };
  format: string;
  type: string;
};

export type SearchResults = {
  media: AnimeShort[];
  pageInfo: PageInfo;
};

export type PageInfo = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
};

export type SearchVariables = {
  search: string | undefined;
  genres: string | undefined;
  year: string | undefined;
  season?: string | undefined;
  format: string | undefined;
  status: string | undefined;
  countryOfOrigin: string | undefined;
  isAdult: string | undefined;
  sort: string | undefined;
};

export type SearchableParams = {
  search: string;
  genres: string;
  year: string;
  season?: string;
  format: string;
  status: string;
  countryOfOrigin: string;
  isAdult: string;
  sort: string;
}[];
