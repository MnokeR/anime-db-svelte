export type Anime = {
  trending: { media: AnimeShort[] };
  top: { media: AnimeShort[] };
  popular: { media: AnimeShort[] };
  season: { media: AnimeShort[] };
  nextSeason: { media: AnimeShort[] };
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
