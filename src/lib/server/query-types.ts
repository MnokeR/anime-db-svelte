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
};

export type SearchResults = {
  media: AnimeShort[];
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
};
