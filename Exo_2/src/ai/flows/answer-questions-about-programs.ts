'use server';

/**
 * @fileOverview An AI agent that answers questions about OFPPT digital programs using a knowledge base.
 *
 * - answerQuestionsAboutPrograms - A function that answers questions about OFPPT digital programs.
 * - AnswerQuestionsAboutProgramsInput - The input type for the answerQuestionsAboutPrograms function.
 * - AnswerQuestionsAboutProgramsOutput - The return type for the answerQuestionsAboutPrograms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerQuestionsAboutProgramsInputSchema = z.object({
  question: z.string().describe('The question about OFPPT digital programs.'),
  context: z.string().describe('The context from the knowledge base.').optional(),
});
export type AnswerQuestionsAboutProgramsInput = z.infer<typeof AnswerQuestionsAboutProgramsInputSchema>;

const AnswerQuestionsAboutProgramsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
  citations: z.array(
    z.object({
      title: z.string().describe('The title of the source document.'),
      url: z.string().describe('The URL of the source document.'),
      confidenceScore: z.number().describe('The confidence score of the source document.'),
    })
  ).describe('The citations for the answer.'),
});
export type AnswerQuestionsAboutProgramsOutput = z.infer<typeof AnswerQuestionsAboutProgramsOutputSchema>;

export async function answerQuestionsAboutPrograms(input: AnswerQuestionsAboutProgramsInput): Promise<AnswerQuestionsAboutProgramsOutput> {
  return answerQuestionsAboutProgramsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerQuestionsAboutProgramsPrompt',
  input: {schema: AnswerQuestionsAboutProgramsInputSchema},
  output: {schema: AnswerQuestionsAboutProgramsOutputSchema},
  prompt: `You are CampusPathBot for OFPPT. Your goal is to help students explore digital learning paths.

- Answer concisely in the user’s language (FR default; AR and EN supported).
- Use only the provided context chunks; cite sources with title/URL.
- If missing or low confidence, ask a clarifying question or refer to official OFPPT links without inventing details.
- Keep a helpful, neutral tone. Do not provide personal, legal, or medical advice. Avoid sensitive content.

Context: {{{context}}}

Question: {{{question}}}`,
});

const answerQuestionsAboutProgramsFlow = ai.defineFlow(
  {
    name: 'answerQuestionsAboutProgramsFlow',
    inputSchema: AnswerQuestionsAboutProgramsInputSchema,
    outputSchema: AnswerQuestionsAboutProgramsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
