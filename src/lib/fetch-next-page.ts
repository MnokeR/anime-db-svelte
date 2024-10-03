type FetchnextPageParams = {
  pageInfo: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
  };
  fetchingNextPage: boolean;
  searchParams: URLSearchParams;
};

const fetchNextPage = async ({
  pageInfo,
  fetchingNextPage,
  searchParams,
}: FetchnextPageParams) => {
  const BASE_URL = "https://graphql.anilist.co";
  if (!pageInfo.hasNextPage || fetchingNextPage) return;
  fetchingNextPage = true;
  const params = {
    search: searchParams.get("term") || undefined,
    year: searchParams.get("year") || undefined,
    season: searchParams.get("season") || undefined,
    sort: searchParams.get("sort") || undefined,
  };
  const variables = {
    type: "ANIME",
    page: pageInfo.currentPage + 1,
    search: params.search,
    year: params.year ? params.year + "%" : undefined,
    season: params.season,
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
      query: animeSearchQuery,
      variables,
    }),
  };

  const response = await fetch(BASE_URL, options);
  const searchData: { data: SearchData } = await response.json();
  animes = [...animes, searchData.data];
  pageInfo = searchData.data.Page.pageInfo;
  fetchingNextPage = false;
};
