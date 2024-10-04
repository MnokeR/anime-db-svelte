import type { PageInfo, SearchVariables } from "../types/types";

export const BASE_URL = "https://graphql.anilist.co";

const animeQuery =
  "query($season:MediaSeason,$seasonYear:Int $nextSeason:MediaSeason,$nextYear:Int){trending:Page(page:1,perPage:6){media(sort:TRENDING_DESC,type:ANIME,isAdult:false){...media}}season:Page(page:1,perPage:6){media(season:$season,seasonYear:$seasonYear,sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}nextSeason:Page(page:1,perPage:6){media(season:$nextSeason,seasonYear:$nextYear,sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}popular:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:ANIME,isAdult:false){...media}}top:Page(page:1,perPage:12){media(sort:SCORE_DESC,type:ANIME,isAdult:false){...media}}}fragment media on Media{id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry{id status}nextAiringEpisode{airingAt timeUntilAiring episode}studios(isMain:true){edges{isMain node{id name}}}}";

const animeVariables = {
  type: "ANIME",
  season: "SUMMER",
  seasonYear: 2024,
  nextSeason: "FALL",
  nextYear: "2024",
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

const mangaQuery =
  'query{trending:Page(page:1,perPage:6){media(sort:TRENDING_DESC,type:MANGA,isAdult:false){...media}}popular:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:MANGA,isAdult:false){...media}}manhwa:Page(page:1,perPage:6){media(sort:POPULARITY_DESC,type:MANGA,countryOfOrigin:"KR",isAdult:false){...media}}top:Page(page:1,perPage:12){media(sort:SCORE_DESC,type:MANGA,isAdult:false){...media}}}fragment media on Media{id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity mediaListEntry{id status}}';

const mangaVariables = {
  type: "MANGA",
  season: "SUMMER",
  seasonYear: 2024,
  nextSeason: "FALL",
  nextYear: 2024,
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

export const animeSearchQuery =
  "query($page:Int = 1 $id:Int $type:MediaType $isAdult:Boolean = false $search:String $format:[MediaFormat]$status:MediaStatus $countryOfOrigin:CountryCode $source:MediaSource $season:MediaSeason $seasonYear:Int $year:String $onList:Boolean $yearLesser:FuzzyDateInt $yearGreater:FuzzyDateInt $episodeLesser:Int $episodeGreater:Int $durationLesser:Int $durationGreater:Int $chapterLesser:Int $chapterGreater:Int $volumeLesser:Int $volumeGreater:Int $licensedBy:[Int]$isLicensed:Boolean $genres:[String]$excludedGenres:[String]$tags:[String]$excludedTags:[String]$minimumTagRank:Int $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]){Page(page:$page,perPage:24){pageInfo{total perPage currentPage lastPage hasNextPage}media(id:$id type:$type season:$season format_in:$format status:$status countryOfOrigin:$countryOfOrigin source:$source search:$search onList:$onList seasonYear:$seasonYear startDate_like:$year startDate_lesser:$yearLesser startDate_greater:$yearGreater episodes_lesser:$episodeLesser episodes_greater:$episodeGreater duration_lesser:$durationLesser duration_greater:$durationGreater chapters_lesser:$chapterLesser chapters_greater:$chapterGreater volumes_lesser:$volumeLesser volumes_greater:$volumeGreater licensedById_in:$licensedBy isLicensed:$isLicensed genre_in:$genres genre_not_in:$excludedGenres tag_in:$tags tag_not_in:$excludedTags minimumTagRank:$minimumTagRank sort:$sort isAdult:$isAdult){id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity nextAiringEpisode{airingAt timeUntilAiring episode}mediaListEntry{id status}studios(isMain:true){edges{isMain node{id name}}}}}}";

export const mangaSearchQuery = `query($page:Int = 1 $id:Int $type:MediaType $isAdult:Boolean = false $search:String $format:[MediaFormat]$status:MediaStatus $countryOfOrigin:CountryCode $source:MediaSource $season:MediaSeason $seasonYear:Int $year:String $onList:Boolean $yearLesser:FuzzyDateInt $yearGreater:FuzzyDateInt $episodeLesser:Int $episodeGreater:Int $durationLesser:Int $durationGreater:Int $chapterLesser:Int $chapterGreater:Int $volumeLesser:Int $volumeGreater:Int $licensedBy:[Int]$isLicensed:Boolean $genres:[String]$excludedGenres:[String]$tags:[String]$excludedTags:[String]$minimumTagRank:Int $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]){Page(page:$page,perPage:24){pageInfo{total perPage currentPage lastPage hasNextPage}media(id:$id type:$type season:$season format_in:$format status:$status countryOfOrigin:$countryOfOrigin source:$source search:$search onList:$onList seasonYear:$seasonYear startDate_like:$year startDate_lesser:$yearLesser startDate_greater:$yearGreater episodes_lesser:$episodeLesser episodes_greater:$episodeGreater duration_lesser:$durationLesser duration_greater:$durationGreater chapters_lesser:$chapterLesser chapters_greater:$chapterGreater volumes_lesser:$volumeLesser volumes_greater:$volumeGreater licensedById_in:$licensedBy isLicensed:$isLicensed genre_in:$genres genre_not_in:$excludedGenres tag_in:$tags tag_not_in:$excludedTags minimumTagRank:$minimumTagRank sort:$sort isAdult:$isAdult){id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity nextAiringEpisode{airingAt timeUntilAiring episode}mediaListEntry{id status}studios(isMain:true){edges{isMain node{id name}}}}}}`;

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

export const detailsQuery = `query media($id:Int,$type:MediaType,$isAdult:Boolean){Media(id:$id,type:$type,isAdult:$isAdult){id title{userPreferred romaji english native}coverImage{extraLarge large}bannerImage startDate{year month day}endDate{year month day}description season seasonYear type format status(version:2)episodes duration chapters volumes genres synonyms source(version:3)isAdult isLocked meanScore averageScore popularity favourites isFavouriteBlocked hashtag countryOfOrigin isLicensed isFavourite isRecommendationBlocked isFavouriteBlocked isReviewBlocked nextAiringEpisode{airingAt timeUntilAiring episode}relations{edges{id relationType(version:2)node{id title{userPreferred}format type status(version:2)bannerImage coverImage{large}}}}characterPreview:characters(perPage:6,sort:[ROLE,RELEVANCE,ID]){edges{id role name voiceActors(language:JAPANESE,sort:[RELEVANCE,ID]){id name{userPreferred}language:languageV2 image{large}}node{id name{userPreferred}image{large}}}}staffPreview:staff(perPage:8,sort:[RELEVANCE,ID]){edges{id role node{id name{userPreferred}language:languageV2 image{large}}}}studios{edges{isMain node{id name}}}reviewPreview:reviews(perPage:2,sort:[RATING_DESC,ID]){pageInfo{total}nodes{id summary rating ratingAmount user{id name avatar{large}}}}recommendations(perPage:7,sort:[RATING_DESC,ID]){pageInfo{total}nodes{id rating userRating mediaRecommendation{id title{userPreferred}format type status(version:2)bannerImage coverImage{large}}user{id name avatar{large}}}}externalLinks{id site url type language color icon notes isDisabled}streamingEpisodes{site title thumbnail url}trailer{id site}rankings{id rank type format year season allTime context}tags{id name description rank isMediaSpoiler isGeneralSpoiler userId}mediaListEntry{id status score}stats{statusDistribution{status amount}scoreDistribution{score amount}}}}`;
