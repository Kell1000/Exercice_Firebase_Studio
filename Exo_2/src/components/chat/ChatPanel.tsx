"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { submitMessage } from "@/lib/actions";
import type { ChatMessage } from "@/lib/types";
import { ChatMessages } from "./ChatMessages";
import { SuggestedPrompts } from "./SuggestedPrompts";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <Send className="h-5 w-5" />
      )}
    </Button>
  );
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [formState, formAction] = useFormState(submitMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formState.success && formState.response) {
      setMessages((prevMessages) => [...prevMessages, formState.response!]);
      formRef.current?.reset();
    } else if (!formState.success && formState.message && messages.length > 0) {
      // Handle error from server action
      const errorResponse: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, something went wrong: ${formState.message}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }
  }, [formState]);

  const handlePromptClick = (prompt: string) => {
    if (inputRef.current) {
        inputRef.current.value = prompt;
        inputRef.current.focus();
    }
  };

  const handleFormAction = (formData: FormData) => {
    const userMessage = formData.get("message") as string;
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
    };
    
    const loadingMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: '',
        isStreaming: true,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage, loadingMessage]);
    
    formData.set('history', JSON.stringify(messages));

    formAction(formData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl rounded-xl">
      <CardContent className="p-2 md:p-4">
        <div className="flex flex-col h-[70vh] max-h-[70vh]">
          <div className="flex-grow overflow-y-auto pr-4">
             <ChatMessages messages={messages} />
          </div>
          <div className="mt-4">
            {messages.length === 0 && <SuggestedPrompts onPromptClick={handlePromptClick} />}
            <form
              ref={formRef}
              action={handleFormAction}
              className="flex items-center gap-2 p-2 bg-background rounded-lg border"
            >
              <Input
                ref={inputRef}
                name="message"
                placeholder="Ask about a program, duration, or campus..."
                className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                autoComplete="off"
              />
              <SubmitButton />
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
