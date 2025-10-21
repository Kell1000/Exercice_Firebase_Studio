import type { AnswerQuestionsAboutProgramsOutput } from "@/ai/flows/answer-questions-about-programs";

export interface Program {
  id: string;
  title: string;
  level: 'Technicien' | 'Technicien Spécialisé';
  domain: 'Développement' | 'Données' | 'Réseaux' | 'Cloud' | 'Cybersecurity';
  durationMonths: number;
  campuses: string[];
  prerequisites: string[];
  description: string;
  officialUrl: string;
  updatedAt: string;
  imageId: string;
  modules: string[];
  outcomes: string[];
  certifications: string[];
  admission: string;
  schedule: string;
  tuition: string;
}

export interface Campus {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  url: string;
}

export type Citation = AnswerQuestionsAboutProgramsOutput['citations'][0];

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: Citation[];
  isStreaming?: boolean;
}
