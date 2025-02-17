// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  
  // Simulated AI response
  const responses = [
    "That's an interesting question!",
    "I'm here to help, what else do you want to know?",
    "Can you clarify your question a bit more?",
    "AI is evolving fast, let's dive into the details!",
  ];
  
  const reply = responses[Math.floor(Math.random() * responses.length)];

  return NextResponse.json({ reply });
}
