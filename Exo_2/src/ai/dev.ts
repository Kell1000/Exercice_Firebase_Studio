import { config } from 'dotenv';
config();

import '@/ai/flows/translate-information-into-desired-language.ts';
import '@/ai/flows/get-clarification-for-unclear-queries.ts';
import '@/ai/flows/summarize-program-details.ts';
import '@/ai/flows/answer-questions-about-programs.ts';