import { BASE_API_URL, FETCH_API_OPTIONS } from "@/utils/constants";

import { baseMediaExtractor } from "@/utils/helpers";

export async function getRecommendedMediaDetails(query) {
  // returning null since when looping if i don't find a recommended media i want to continue finding the rest of recommendations
  try {
    const res = await fetch(`${BASE_API_URL}/search/multi?query=${query}`, {
      ...FETCH_API_OPTIONS,
    });
    if (!res.ok) return null;

    const { results } = await res.json();

    if (!results && results.length === 0) {
      return null;
    }

    const result = results.at(0);

    if (result.media_type === "person") return null;

    const extractedData = baseMediaExtractor(result);

    return extractedData;
  } catch (err) {
    return null;
  }
}
