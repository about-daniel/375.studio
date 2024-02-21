import { fetchAPI } from "./fetch-api";

export async function getSingleBySlug(path, slug) {
  const urlParamsObject = { filters: { slug }, populate: "deep" };
  const response = await fetchAPI(path, urlParamsObject);
  return response[0];
}
