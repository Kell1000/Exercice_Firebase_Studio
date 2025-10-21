# **App Name**: CampusPathBot

## Core Features:

- Chatbot Interface: Interactive chat window with message bubbles, streaming responses, typing indicators, and language support (FR/AR/EN).
- AI-Powered Question Answering: Utilize Vertex AI Gemini 1.5 Flash (or OpenAI gpt-4o-mini as a fallback) to answer student questions about OFPPT digital programs, grounded in an internal knowledge base (RAG) as a tool.
- Source Citation: Provide citations for each answer, including the title, URL, and confidence score of the source document.
- Program Explorer: Browse and filter OFPPT digital programs by domain, level, duration, and campus.
- Program Details Page: Display detailed information for each program, including prerequisites, modules, outcomes, certifications, admission details, schedule, and official links.
- Admin Ingestion Tool: Admin interface to upload/update CSV/JSON/PDF documents and trigger re-ingestion and re-embedding of the knowledge base.
- Chat History: Save chat history per user (if signed in and consent given) using Firestore to preserve data.

## Style Guidelines:

- Primary color: Soft blue (#75A3D1), inspired by the professional and reliable aspects of education but without being too cold.
- Background color: Very light blue (#F0F4F8), creating a calm and unobtrusive backdrop.
- Accent color: Muted purple (#9CA3D1), an analogous color that provides gentle contrast and visual interest.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy feel. Body text: 'Inter' (sans-serif) for readability.
- Use clean, modern icons to represent program domains, campuses, and other key features.
- Mobile-first responsive design with a clean, intuitive layout that is easy to navigate on any device.
- Subtle animations for loading indicators and transitions to improve the user experience.