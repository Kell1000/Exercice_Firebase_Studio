'use server';

/**
 * @fileOverview Summarizes the details of a specific program using a language model.
 *
 * - summarizeProgramDetails - A function that handles the program details summarization process.
 * - SummarizeProgramDetailsInput - The input type for the summarizeProgramDetails function.
 * - SummarizeProgramDetailsOutput - The return type for the summarizeProgramDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProgramDetailsInputSchema = z.object({
  programDetails: z.string().describe('The detailed information about the program to be summarized.'),
});
export type SummarizeProgramDetailsInput = z.infer<typeof SummarizeProgramDetailsInputSchema>;

const SummarizeProgramDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the program details.'),
});
export type SummarizeProgramDetailsOutput = z.infer<typeof SummarizeProgramDetailsOutputSchema>;

export async function summarizeProgramDetails(
  input: SummarizeProgramDetailsInput
): Promise<SummarizeProgramDetailsOutput> {
  return summarizeProgramDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProgramDetailsPrompt',
  input: {schema: SummarizeProgramDetailsInputSchema},
  output: {schema: SummarizeProgramDetailsOutputSchema},
  prompt: `You are an expert educational program summarizer. Please provide a concise and informative summary of the following program details:

  {{{programDetails}}}
  `,
});

const summarizeProgramDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeProgramDetailsFlow',
    inputSchema: SummarizeProgramDetailsInputSchema,
    outputSchema: SummarizeProgramDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
