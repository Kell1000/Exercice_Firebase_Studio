"use client";

import { Button } from "@/components/ui/button";

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  "What is the Full Stack Development program?",
  "How long is the Data Analyst course?",
  "Which campuses offer Cybersecurity?",
  "Tell me about the Cloud & DevOps program.",
];

export function SuggestedPrompts({ onPromptClick }: SuggestedPromptsProps) {
  return (
    <div className="mb-4">
      <p className="text-sm text-center text-muted-foreground mb-2">Try asking:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {prompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onPromptClick(prompt)}
            className="text-left justify-start h-auto whitespace-normal"
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}
