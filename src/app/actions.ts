
"use server";

import {
  personalizedDestinationRecommendations,
  type PersonalizedDestinationRecommendationsInput,
} from "@/ai/flows/personalized-destination-recommendations";
import { z } from "zod";

const FormSchema = z.object({
  budget: z.string().min(1, "Budget is required."),
  travelPreferences: z.string().min(1, "Travel preferences are required."),
  pastTravelHistory: z.string().min(1, "Past travel history is required."),
});

export async function getTravelRecs(
  input: PersonalizedDestinationRecommendationsInput
) {
  const parsed = FormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid input. Please fill all fields." };
  }

  try {
    const result = await personalizedDestinationRecommendations(parsed.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getTravelRecs:", error);
    return {
      success: false,
      error: "🤖 Sorry, I had a little trouble thinking. Please try again.",
    };
  }
}
