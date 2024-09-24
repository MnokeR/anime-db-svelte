import { animeOptions, BASE_URL } from "$lib/server/query";
import type { Anime } from "$lib/server/query-types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const resp = await fetch(BASE_URL, animeOptions);
    const data: { data: Anime } = await resp.json();
    if (resp.ok) {
      return data.data;
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch data" };
  }
};
