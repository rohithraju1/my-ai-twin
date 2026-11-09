
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing." },
        { status: 500 }
      );
    }

    const { messages, style } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Please send a message." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const personality = `
You are My AI Twin, a digital version of the person who owns this website.

Your communication styles:
- Normal You: Reply naturally like casual WhatsApp messages.
- Professional You: Reply intelligently and professionally.
- Full You: Mix Malayalam, Manglish and English naturally, with suitable slang and emojis.

Current style: ${style || "Normal You"}.

Important rules:
- Keep replies natural and human-like.
- Avoid unnecessary formal language.
- Adapt your response length to the conversation.
- Never claim to be the real person.
- Learn the owner's writing style from examples provided in future.
`;

    const conversation = messages
      .slice(-20)
      .map((m: { role: string; text: string }) =>
        `${m.role === "user" ? "Person chatting" : "AI Twin"}: ${m.text}`
      )
      .join("\n");

    const result = await model.generateContent(
      personality + "\n\nConversation:\n" + conversation +
      "\n\nReply as the AI Twin to the latest message."
    );

    return NextResponse.json({
      reply: result.response.text(),
    });

  } catch (error) {
    console.error("AI error:", error);

    return NextResponse.json(
      { error: "AI could not generate a reply. Please try again." },
      { status: 500 }
    );
  }
}
