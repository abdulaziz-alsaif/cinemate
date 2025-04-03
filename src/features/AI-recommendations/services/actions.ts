"use server";

import { openai } from "@/lib/openai/openAI";
import { createClient } from "@/lib/supabase/server";
import { getRecommendedMediaDetails } from "./tmdb-services";

import { BaseMediaType, WatchedListRecommendationType } from "@/types/global.types";
import { getErrorMessage } from "@/utils/helpers";
import { z } from "zod";

export async function getAIRecommendations(
  watchedList: WatchedListRecommendationType[],
  prevRecommendations: string[],
) {
  try {
    if (!Array.isArray(watchedList) || !Array.isArray(prevRecommendations)) {
      throw new Error("watched list and prev recommendations must be arrays.");
    }

    // 1- check watchedlist length
    if (watchedList.length === 0)
      throw new Error("Your Watched list is empty.");

    // 2- check if user is logged in
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("You must be logged in.");

    // 3- get chatgpt media recommendations
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an AI media recommendation system. Your goal is to recommend up to 8 new movies or TV shows based on the user's watched list, their ratings, and TMDB ratings.
              **Important Instructions**:
              1. Ensure that the recommended titles match the exact titles used in TMDB.
              2. Do not recommend any titles from the previousRecommendations list.
              3. Focus on analyzing the user's preferences based on the genres, ratings, and differences between userRating and tmdbRating.
              4. Return output as JSON that contains an array of up to 8 new recommendations (strings) with titles exactly matching TMDB.
              **Input Data Format**:
              1. **User Watched List**:
              - A list of objects, where each object contains:
              - title: The name of the movie or TV show (string, as it appears in TMDB). 
              - userRating: The user's rating on a scale of 1-10 (number). 
              - tmdbRating: The TMDB rating on a scale of 1-10 (number). 
              - genres: The genres of movie or TV show.
              2. **Previous Recommendations**:
              - An array of strings containing titles of movies or TV shows already recommended to the user (as they appear in TMDB).
              **Task**:
              - Analyze the user's watched list to identify their preferences based on genres, ratings, and any significant differences between userRating and tmdbRating.
              - Recommend up to 8 new titles (movies or TV shows) that the user is likely to enjoy.
              - Ensure that all recommendations are unique and not part of the previousRecommendations.
              **Input**:
              - Watched List: ${JSON.stringify(watchedList)}.
              - Previous Recommendations: ${JSON.stringify(prevRecommendations)}.`,
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "recommendations_schema",
          strict: true,
          schema: {
            type: "object",
            properties: {
              recommendations: {
                type: "array",
                description: "A list of recommendations.",
                items: {
                  type: "string",
                },
              },
            },
            required: ["recommendations"],
            additionalProperties: false,
          },
        },
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // 4- check for res returned from chatgpt
    if (completion.choices[0].finish_reason === "length") {
      // handle the case where the model did not return a complete response
      throw new Error("Incomplete response, Please try again later.");
    }

    const message = completion.choices[0].message;

    if (message.refusal) throw new Error(message.refusal);

    if (!message.content)
      throw new Error("Something went wrong, Please try again later.");

    const { recommendations: unSafeRecommendations } = JSON.parse(message.content);

    const { success, data: recommendations } = z.array(z.string()).safeParse(unSafeRecommendations);

    if(!success)
      throw new Error("Something went wrong, Please try again later.");

    // 5- get details of each media recommended
    const requests = recommendations.map((recommendation) =>
      getRecommendedMediaDetails(recommendation),
    );

    const responses = await Promise.allSettled(requests);

    // 6- filter all null values form responses | assert is okay to use here since i'm checking if promise is fulfilled and filtering null values
    const data = responses
      .filter((response) => response.status === "fulfilled" && response.value)
      .map((response) => (response as PromiseFulfilledResult<BaseMediaType>).value);

    if (data.length === 0 || !data) {
      return {
        success: false,
        message: "Sorry we could't get recommendations for you.",
        data: [],
      };
    }

    // 7- return data
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error),
      data: [],
    };
  }
}
