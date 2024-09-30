import { page } from "$app/stores";

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

export const mangaCategories = [
  { label: "Trending", value: "trending" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "top" },
];

export const animeSearchQuery =
  "query($page:Int = 1 $id:Int $type:MediaType $isAdult:Boolean = false $search:String $format:[MediaFormat]$status:MediaStatus $countryOfOrigin:CountryCode $source:MediaSource $season:MediaSeason $seasonYear:Int $year:String $onList:Boolean $yearLesser:FuzzyDateInt $yearGreater:FuzzyDateInt $episodeLesser:Int $episodeGreater:Int $durationLesser:Int $durationGreater:Int $chapterLesser:Int $chapterGreater:Int $volumeLesser:Int $volumeGreater:Int $licensedBy:[Int]$isLicensed:Boolean $genres:[String]$excludedGenres:[String]$tags:[String]$excludedTags:[String]$minimumTagRank:Int $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]){Page(page:$page,perPage:24){pageInfo{total perPage currentPage lastPage hasNextPage}media(id:$id type:$type season:$season format_in:$format status:$status countryOfOrigin:$countryOfOrigin source:$source search:$search onList:$onList seasonYear:$seasonYear startDate_like:$year startDate_lesser:$yearLesser startDate_greater:$yearGreater episodes_lesser:$episodeLesser episodes_greater:$episodeGreater duration_lesser:$durationLesser duration_greater:$durationGreater chapters_lesser:$chapterLesser chapters_greater:$chapterGreater volumes_lesser:$volumeLesser volumes_greater:$volumeGreater licensedById_in:$licensedBy isLicensed:$isLicensed genre_in:$genres genre_not_in:$excludedGenres tag_in:$tags tag_not_in:$excludedTags minimumTagRank:$minimumTagRank sort:$sort isAdult:$isAdult){id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity nextAiringEpisode{airingAt timeUntilAiring episode}mediaListEntry{id status}studios(isMain:true){edges{isMain node{id name}}}}}}";

export const mangaSearchQuery = `query($page:Int = 1 $id:Int $type:MediaType $isAdult:Boolean = false $search:String $format:[MediaFormat]$status:MediaStatus $countryOfOrigin:CountryCode $source:MediaSource $season:MediaSeason $seasonYear:Int $year:String $onList:Boolean $yearLesser:FuzzyDateInt $yearGreater:FuzzyDateInt $episodeLesser:Int $episodeGreater:Int $durationLesser:Int $durationGreater:Int $chapterLesser:Int $chapterGreater:Int $volumeLesser:Int $volumeGreater:Int $licensedBy:[Int]$isLicensed:Boolean $genres:[String]$excludedGenres:[String]$tags:[String]$excludedTags:[String]$minimumTagRank:Int $sort:[MediaSort]=[POPULARITY_DESC,SCORE_DESC]){Page(page:$page,perPage:24){pageInfo{total perPage currentPage lastPage hasNextPage}media(id:$id type:$type season:$season format_in:$format status:$status countryOfOrigin:$countryOfOrigin source:$source search:$search onList:$onList seasonYear:$seasonYear startDate_like:$year startDate_lesser:$yearLesser startDate_greater:$yearGreater episodes_lesser:$episodeLesser episodes_greater:$episodeGreater duration_lesser:$durationLesser duration_greater:$durationGreater chapters_lesser:$chapterLesser chapters_greater:$chapterGreater volumes_lesser:$volumeLesser volumes_greater:$volumeGreater licensedById_in:$licensedBy isLicensed:$isLicensed genre_in:$genres genre_not_in:$excludedGenres tag_in:$tags tag_not_in:$excludedTags minimumTagRank:$minimumTagRank sort:$sort isAdult:$isAdult){id title{userPreferred}coverImage{extraLarge large color}startDate{year month day}endDate{year month day}bannerImage season seasonYear description type format status(version:2)episodes duration chapters volumes genres isAdult averageScore popularity nextAiringEpisode{airingAt timeUntilAiring episode}mediaListEntry{id status}studios(isMain:true){edges{isMain node{id name}}}}}}`;

// const animeSearchVariables = {
//   page: 1,
//   type: "ANIME",
//   search: params.search,
//   format: params.format,
//   year: params.year && params.year + "%",
//   season: params.season,
//   sort: params.sort
//     ? params.sort
//     : params.search
//     ? "SEARCH_MATCH"
//     : undefined,
// };
