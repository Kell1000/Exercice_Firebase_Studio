"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import {
  Bot,
  Loader,
  MessageSquare,
  Send,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getTravelRecs } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";

const FormSchema = z.object({
  budget: z.string().min(1, "Budget is required."),
  travelPreferences: z
    .string()
    .min(3, "Tell us what you like! (e.g. beaches, hiking, museums)"),
  pastTravelHistory: z
    .string()
    .min(3, "Where have you been? (e.g. Paris, Tokyo)"),
});

type Message = {
  id: string;
  type: "user" | "ai" | "loading";
  content: React.ReactNode;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { toast } = useToast();
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      budget: "",
      travelPreferences: "",
      pastTravelHistory: "",
    },
  });

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitted(true);

    const userMessageContent = `My budget is ${data.budget}, I like ${data.travelPreferences}, and I've been to ${data.pastTravelHistory}.`;
    setMessages([
        { id: "start", type: "ai", content: "Hey there! Ready to find your next adventure? 🌍 Just fill out the form and I'll find some great spots for you!"},
        { id: Date.now().toString(), type: "user", content: userMessageContent },
        { id: "loading", type: "loading", content: "Finding the perfect trip for you..." },
    ]);

    const result = await getTravelRecs(data);

    if (result.success && result.data) {
        setMessages(prev => prev.filter(m => m.type !== 'loading').concat({
            id: Date.now().toString(),
            type: "ai",
            content: (
                <div>
                    <p className="mb-4">{result.data.reasoning}</p>
                    <ul className="list-disc pl-5 space-y-2">
                        {result.data.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                </div>
            )
        }));
    } else {
        toast({
            variant: "destructive",
            title: "Oh no!",
            description: result.error,
        });
        setMessages(prev => prev.filter(m => m.type !== 'loading'));
    }
  }
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && messages.length === 0) {
        setMessages([{ id: "start", type: "ai", content: "Hey there! Ready to find your next adventure? 🌍 Just fill out the form and I'll find some great spots for you!"}]);
    }
  }

  const renderMessage = (msg: Message) => {
    const icon = msg.type === "user" ? <User/> : <Bot />;
    const bgColor = msg.type === "user" ? "bg-primary/10" : "bg-muted";
    
    if (msg.type === 'loading') {
        return (
            <div key={msg.id} className="flex items-start gap-3 text-sm">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-muted text-primary"><Loader className="animate-spin" /></span>
                <div className="flex-grow p-3 rounded-lg bg-muted">
                    <p className="font-semibold text-primary">Wanderbot</p>
                    <p className="text-muted-foreground">{msg.content}</p>
                </div>
            </div>
        )
    }

    return (
        <div key={msg.id} className="flex items-start gap-3 text-sm">
            <span className={cn("flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full", bgColor, msg.type === 'user' ? 'text-primary' : 'text-accent-foreground')}>
              {msg.type === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </span>
            <div className={cn("flex-grow p-3 rounded-lg", bgColor)}>
                <p className={cn("font-semibold", msg.type === 'user' ? 'text-primary' : 'text-foreground')}>{msg.type === "user" ? "You" : "Wanderbot"}</p>
                <div className="text-muted-foreground">{msg.content}</div>
            </div>
        </div>
    )
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        onClick={() => handleOpenChange(true)}
        aria-label="Open travel chatbot"
      >
        <MessageSquare size={32} />
      </Button>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle>Your Personal Travel AI 🤖</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
             <div className="space-y-4 py-4">
                {messages.map(renderMessage)}
            </div>
          </ScrollArea>
            {!isSubmitted && (
                 <div className="p-6 border-t bg-background">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>What's your budget?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a budget range" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="$500-1000">$500 - $1000</SelectItem>
                                    <SelectItem value="$1000-2000">$1000 - $2000</SelectItem>
                                    <SelectItem value="$2000-3000">$2000 - $3000</SelectItem>
                                    <SelectItem value="$3000+">$3000+</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="travelPreferences"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>What do you love to do? 🌴</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., hiking, beaches, museums" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pastTravelHistory"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Where have you been before? 🗺️</FormLabel>
                                <FormControl>
                                <Textarea placeholder="e.g., Rome, Bali, Costa Rica" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Find My Trip <Send className="ml-2 h-4 w-4" />
                        </Button>
                        </form>
                    </Form>
                </div>
            )}
        </SheetContent>
      </Sheet>
    </>
  );
}
