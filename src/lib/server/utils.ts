import { detailsQuery } from "./query";

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
