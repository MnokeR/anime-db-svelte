export type DetailsPage = {
  Media: MediaDetails;
};

export type MediaDetails = {
  id: string;
  title: { userPreferred: string };
  averageScore: number;
  bannerImage: string;
  chapters: number;
  coverImage: { extraLarge: string; large: string };
  countryOfOrigin: string;
  characterPreview: Characters;
  description: string;
  duration: number;
  episodes: number;
  format: string;
  genres: string[];
  meanScore: number;
  nextAiringEpisode: {
    airingAt: number;
    episode: number;
    timeUntilAiring: number;
  };
  recommendations: Recommendations;
  relations: Relations;
  season: string;
  seasonYear: number;
  source: string;
  startData: { year: number; month: number; day: number };
  endDate: { year: number; month: number; day: number };
  status: string;
  studios: Studios;
  synonyms: string[];
  trailer: { id: string; site: string };
  type: string;
  volumes: number;
};

type Characters = {
  edges: {
    id: number;
    role: string;
    name: { userPreferred: string };
    node: {
      id: number;
      image: { large: string };
      name: { userPreferred: string };
    };
  }[];
};

type Relations = {
  edges: {
    id: number;
    relationType: string;
    node: {
      id: number;
      title: {
        userPreferred: string;
      };
      type: string;
      status: string;
      format: string;
      bannerImage: string;
      coverImage: {
        large: string;
      };
    };
  };
};

type Studios = {
  edges: {
    isMain: boolean;
    node: {
      id: number;
      name: string;
    };
  }[];
};

type Recommendations = {
  nodes: {
    id: number;
    rating: number;
    mediaRecommendation: {
      bannerImage: string;
      coverImage: { large: string };
      format: string;
      id: number;
      title: { userPreferred: string };
      type: string;
    };
  }[];
};
