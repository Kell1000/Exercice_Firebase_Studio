'use server';
/**
 * @fileOverview This file defines a Genkit flow for handling unclear user queries. When the chatbot
 * is unsure about a user's question, this flow generates a clarifying question to better understand
 * the user's needs.
 *
 * @interface GetClarificationForUnclearQueriesInput - Defines the input schema for the flow, which includes the user's query and the confidence score of the initial answer.
 * @interface GetClarificationForUnclearQueriesOutput - Defines the output schema for the flow, which includes a clarifying question to ask the user.
 *
 * @function getClarificationForUnclearQueries - The main function that triggers the flow to generate a clarifying question.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetClarificationForUnclearQueriesInputSchema = z.object({
  query: z.string().describe('The user query that needs clarification.'),
  confidenceScore: z.number().describe('The confidence score of the initial answer.'),
});
export type GetClarificationForUnclearQueriesInput = z.infer<
  typeof GetClarificationForUnclearQueriesInputSchema
>;

const GetClarificationForUnclearQueriesOutputSchema = z.object({
  clarifyingQuestion: z
    .string()
    .describe('A clarifying question to better understand the user query.'),
});
export type GetClarificationForUnclearQueriesOutput = z.infer<
  typeof GetClarificationForUnclearQueriesOutputSchema
>;

export async function getClarificationForUnclearQueries(
  input: GetClarificationForUnclearQueriesInput
): Promise<GetClarificationForUnclearQueriesOutput> {
  return getClarificationForUnclearQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getClarificationForUnclearQueriesPrompt',
  input: {schema: GetClarificationForUnclearQueriesInputSchema},
  output: {schema: GetClarificationForUnclearQueriesOutputSchema},
  prompt: `You are an AI assistant designed to generate clarifying questions when a user's initial query is ambiguous or when the system has low confidence in its initial answer.

  User Query: {{{query}}}
  Confidence Score: {{{confidenceScore}}}

  Generate a single, concise clarifying question that will help you better understand the user's needs. The question should be open-ended and encourage the user to provide more specific information.
  Do not include any preamble or other text except the clarifying question.
  Clarifying Question:`,
});

const getClarificationForUnclearQueriesFlow = ai.defineFlow(
  {
    name: 'getClarificationForUnclearQueriesFlow',
    inputSchema: GetClarificationForUnclearQueriesInputSchema,
    outputSchema: GetClarificationForUnclearQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
