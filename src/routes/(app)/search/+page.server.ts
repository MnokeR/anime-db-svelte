import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = () => {
  redirect(303, "/search/anime");
};
