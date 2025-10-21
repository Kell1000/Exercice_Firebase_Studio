'use server';
/**
 * @fileOverview A translation AI agent. Translates information into the desired language.
 *
 * - translateInformationIntoDesiredLanguage - A function that handles the translation process.
 * - TranslateInformationIntoDesiredLanguageInput - The input type for the translateInformationIntoDesiredLanguage function.
 * - TranslateInformationIntoDesiredLanguageOutput - The return type for the translateInformationIntoDesiredLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateInformationIntoDesiredLanguageInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z
    .enum(['fr', 'ar', 'en'])
    .describe('The target language for the translation (fr, ar, or en).'),
});
export type TranslateInformationIntoDesiredLanguageInput = z.infer<
  typeof TranslateInformationIntoDesiredLanguageInputSchema
>;

const TranslateInformationIntoDesiredLanguageOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateInformationIntoDesiredLanguageOutput = z.infer<
  typeof TranslateInformationIntoDesiredLanguageOutputSchema
>;

export async function translateInformationIntoDesiredLanguage(
  input: TranslateInformationIntoDesiredLanguageInput
): Promise<TranslateInformationIntoDesiredLanguageOutput> {
  return translateInformationIntoDesiredLanguageFlow(input);
}

const translateInformationPrompt = ai.definePrompt({
  name: 'translateInformationPrompt',
  input: {schema: TranslateInformationIntoDesiredLanguageInputSchema},
  output: {schema: TranslateInformationIntoDesiredLanguageOutputSchema},
  prompt: `Translate the following text into {{targetLanguage}}:

{{text}}`,
});

const translateInformationIntoDesiredLanguageFlow = ai.defineFlow(
  {
    name: 'translateInformationIntoDesiredLanguageFlow',
    inputSchema: TranslateInformationIntoDesiredLanguageInputSchema,
    outputSchema: TranslateInformationIntoDesiredLanguageOutputSchema,
  },
  async input => {
    const {output} = await translateInformationPrompt(input);
    return output!;
  }
);
