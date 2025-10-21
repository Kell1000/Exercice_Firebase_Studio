import ChatPanel from "@/components/chat/ChatPanel";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">CampusPathBot</h1>
        <p className="text-lg text-muted-foreground mt-2">Your guide to OFPPT digital learning paths.</p>
      </header>
      <ChatPanel />
    </div>
  );
}
