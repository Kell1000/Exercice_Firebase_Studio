"use server";

import { z } from "zod";
import { delay } from "./utils";
import type { ChatMessage, Citation } from "./types";
import { programs } from "./data";

const MessageSchema = z.object({
  message: z.string().min(1, "Message is required."),
  history: z.array(z.any()),
});

type FormState = {
  success: boolean;
  message: string;
  response?: ChatMessage;
};

// Mock function to simulate AI response generation
const generateMockAiResponse = (userMessage: string): { answer: string; citations: Citation[] } => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Find a program that matches the user's query
    const relevantProgram = programs.find(p => 
        lowerCaseMessage.includes(p.domain.toLowerCase()) || 
        lowerCaseMessage.includes(p.title.toLowerCase().split(' ')[0])
    );

    if (relevantProgram) {
        let answer = `Le programme "${relevantProgram.title}" semble correspondre à votre question. `;
        if (lowerCaseMessage.includes('durée') || lowerCaseMessage.includes('duration')) {
            answer += `La durée est de ${relevantProgram.durationMonths} mois. `;
        } else if (lowerCaseMessage.includes('campus')) {
            answer += `Il est disponible dans les campus suivants: ${relevantProgram.campuses.join(', ')}. `;
        } else {
            answer += `C'est un programme de niveau "${relevantProgram.level}" dans le domaine du "${relevantProgram.domain}". ${relevantProgram.description}`;
        }

        const citation: Citation = {
            title: relevantProgram.title,
            url: relevantProgram.officialUrl,
            confidenceScore: Math.random() * (0.98 - 0.85) + 0.85, // Random score between 0.85 and 0.98
        };
        return { answer, citations: [citation] };
    }

    if (lowerCaseMessage.includes("bonjour") || lowerCaseMessage.includes("salut")) {
        return {
            answer: "Bonjour! Je suis CampusPathBot, votre assistant pour explorer les formations digitales de l'OFPPT. Comment puis-je vous aider aujourd'hui?",
            citations: [],
        };
    }

    // Default response if no program matches
    return {
        answer: "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ? Vous pouvez me demander des informations sur les programmes, leur durée, ou les campus disponibles.",
        citations: [],
    };
};


export async function submitMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = MessageSchema.safeParse({
    message: formData.get("message"),
    history: JSON.parse(formData.get("history") as string),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.errors.map((e) => e.message).join(", "),
    };
  }

  const { message } = parsed.data;

  try {
    // Simulate network delay
    await delay(1000);

    // This is where you would call your actual AI flow.
    // e.g., const result = await answerQuestionsAboutPrograms({ question: message, context: "..." });
    // For now, we use a mock function.
    const result = generateMockAiResponse(message);

    const responseMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: result.answer,
      citations: result.citations,
    };

    return {
      success: true,
      message: "Response generated.",
      response: responseMessage,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while getting a response.",
    };
  }
}
