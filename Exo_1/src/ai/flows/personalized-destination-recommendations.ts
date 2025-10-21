// src/ai/flows/personalized-destination-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized destination recommendations based on user preferences.
 *
 * - personalizedDestinationRecommendations - A function that provides personalized destination recommendations.
 * - PersonalizedDestinationRecommendationsInput - The input type for the personalizedDestinationRecommendations function.
 * - PersonalizedDestinationRecommendationsOutput - The return type for the personalizedDestinationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDestinationRecommendationsInputSchema = z.object({
  budget: z.string().describe('The user\u0027s budget for the trip (e.g., \"$1000-2000\").'),
  travelPreferences: z
    .string()
    .describe(
      'The user\u0027s travel preferences (e.g., \"adventure, relaxation, cultural\").'
    ),
  pastTravelHistory: z
    .string()
    .describe(
      'A summary of the user\u0027s past travel history, including destinations and activities.'
    ),
});
export type PersonalizedDestinationRecommendationsInput = z.infer<
  typeof PersonalizedDestinationRecommendationsInputSchema
>;

const PersonalizedDestinationRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized destination recommendations.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type PersonalizedDestinationRecommendationsOutput = z.infer<
  typeof PersonalizedDestinationRecommendationsOutputSchema
>;

export async function personalizedDestinationRecommendations(
  input: PersonalizedDestinationRecommendationsInput
): Promise<PersonalizedDestinationRecommendationsOutput> {
  return personalizedDestinationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDestinationRecommendationsPrompt',
  input: {
    schema: PersonalizedDestinationRecommendationsInputSchema,
  },
  output: {schema: PersonalizedDestinationRecommendationsOutputSchema},
  prompt: `You are a travel expert providing personalized destination recommendations.

  Based on the user's budget, travel preferences, and past travel history, recommend a list of destinations.

  Budget: {{{budget}}}
  Travel Preferences: {{{travelPreferences}}}
  Past Travel History: {{{pastTravelHistory}}}

  Provide a short explanation of why you are recommending these destinations.

  Format your response as a JSON object with \"recommendations\" and \"reasoning\" fields.
  The \"recommendations\" field is an array of strings.
`,
});

const personalizedDestinationRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedDestinationRecommendationsFlow',
    inputSchema: PersonalizedDestinationRecommendationsInputSchema,
    outputSchema: PersonalizedDestinationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
