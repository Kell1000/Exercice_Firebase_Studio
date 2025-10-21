"use client";

import { useState, useEffect } from 'react';
import { Bot, User, FileText, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage, Citation } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MessageBubbleProps {
  message: ChatMessage;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce"></span>
  </div>
);

const StreamingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return;
        setDisplayedText(''); // Reset on new text
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text[i]);
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 20); // Adjust speed of typing effect

        return () => clearInterval(intervalId);
    }, [text]);

    return <p>{displayedText}</p>;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const bubbleClasses = cn(
    "p-4 rounded-xl max-w-xl w-fit",
    {
      "bg-primary text-primary-foreground self-end rounded-br-none": isUser,
      "bg-card text-card-foreground self-start rounded-bl-none border shadow-sm": !isUser,
    }
  );

  const wrapperClasses = cn("flex flex-col", { "items-end": isUser, "items-start": !isUser });

  const Icon = isUser ? User : Bot;
  
  const iconClasses = cn("h-8 w-8 p-1.5 rounded-full border", {
    "bg-primary text-primary-foreground border-primary/20": isUser,
    "bg-card text-card-foreground": !isUser,
  });

  return (
    <div className={wrapperClasses}>
       <div className={cn("flex items-start gap-3", { "flex-row-reverse": isUser })}>
        <div className={cn(iconClasses, "mt-1")}>
          <Icon className="h-full w-full" />
        </div>
        <div className={bubbleClasses}>
          {message.isStreaming ? (
            <TypingIndicator />
          ) : (
            <>
              {message.role === 'assistant' ? (
                <StreamingText text={message.content} />
              ) : (
                <p>{message.content}</p>
              )}
            </>
          )}
        </div>
      </div>
      {message.citations && message.citations.length > 0 && !message.isStreaming && (
        <div className="mt-2 w-full max-w-xl pl-12">
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="text-sm text-muted-foreground py-1 hover:no-underline justify-start gap-1">
                <FileText className="h-4 w-4" />
                Sources ({message.citations.length})
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                 <div className="space-y-2">
                    {message.citations.map((citation, index) => (
                      <a
                        key={index}
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-2 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <p className="font-medium text-sm truncate">{citation.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                           <BadgeCheck className="h-3 w-3 text-green-500" />
                           <span>Confidence: {(citation.confidenceScore * 100).toFixed(1)}%</span>
                        </div>
                      </a>
                    ))}
                  </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
