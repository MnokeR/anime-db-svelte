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
